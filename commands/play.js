const getArgValue = require("../utils/getArgValue.js");
const ytcog = require("ytcog");
const play = require("play-dl");
const https = require("https");
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioResource, StreamType } = require("@discordjs/voice");

module.exports = {
    async execute(client, interaction) {
        const voiceChannel = client.playbackChannel || interaction.member.voice.channel;

        if (!voiceChannel) {
            require("../utils/sendReply.js")(client, interaction, { content: "Please join a voice channel!", ephemeral: true });
            return;
        }

        client.playbackChannel = voiceChannel;

        const args = interaction.options;
        const url = getArgValue(args, "url");

        if (!client.musicPlayer.connection) {
            client.musicPlayer.connection = await joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });
            client.musicPlayer.textChannel = interaction.channelId;
        }

        await require("../utils/queueSong.js")(client, interaction, url);

        if (!client.musicPlayer.isPlaying) {
            if (!client.musicPlayer.player) {
                client.musicPlayer.player = createAudioPlayer({});
                await client.musicPlayer.connection.subscribe(client.musicPlayer.player);
                client.musicPlayer.player
                    .on("stateChange", async (oldState, newState) => {
                        if (newState.status === "idle") {
                            client.musicPlayer.isPlaying = false;
                            if (client.queue.length) {
                                client.queue.shift();
                            }
                            if (client.queue.length) {
                                const video = client.queue[0].video;
                                let stream = await play.stream("https://youtu.be/" + video.info().options.id);
                                const resource = await createAudioResource(stream.stream, { inputType: stream.type });
                                client.musicPlayer.player.play(resource);
                                client.musicPlayer.isPlaying = true;
                                const channel = client.channels.cache.get(client.musicPlayer.textChannel);
                                const eventMessage = await channel.send("Now playing: " + client.queue[0].title + " (" + client.queue[0].duration + ")");
                            } else {
                                setTimeout(() => {
                                    if (!client.queue.length) {
                                        if (client.musicPlayer.connection) {
                                            client.musicPlayer.connection.destroy();
                                        }
                                        client.queue = [];
                                        client.playbackChannel = null;
                                        client.musicPlayer = {};
                                    }
                                }, 60000);
                            }
                        }
                    })
                    .on("error", async (error) => {
                        const channel = client.channels.cache.get(client.musicPlayer.textChannel);
                        const eventMessage = await channel.send("Error: " + error);
                    });
            }
            if (client.queue.length) {
                const video = client.queue[0].video;
                const videoOption = {
                    id: video.info().options.id,
                    container: "webm",
                    videoQuality: "none",
                    audioQuality: "highest",
                    mediaBitrate: "highest",
                    metadata: "author,title",
                };
                await video.fetch([videoOption]);
                let stream = await play.stream("https://youtu.be/" + video.info().options.id);
                const resource = await createAudioResource(stream.stream, { inputType: stream.type });
                client.musicPlayer.player.play(resource);
                client.musicPlayer.isPlaying = true;
                const channel = client.channels.cache.get(client.musicPlayer.textChannel);
                const eventMessage = await channel.send("Now playing: " + client.queue[0].title + " (" + client.queue[0].duration + ")");
            }
        }
    },
    data: {
        name: "play",
        description: "Play a song",
        options: [
            {
                name: "url",
                type: "STRING",
                description: "The song you want to play",
                required: true,
            },
        ],
    },
};
