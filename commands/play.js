const getArgValue = require("../utils/getArgValue.js");
const ytcog = require("ytcog");
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioResource } = require("@discordjs/voice");

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

        require("../utils/queueSong.js")(client, interaction, url);

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
                                const videoOption = {
                                    id: video.info().options.id,
                                    container: "wemb",
                                    videoQuality: "none",
                                    audioQuality: "highest",
                                    mediaBitrate: "highest",
                                    metadata: "author,title",
                                };
                                await video.fetch([videoOption]);
                                const audioUrl = video.info().audioStreams[0].url;
                                const resource = await createAudioResource(audioUrl, { inlineVolume: client.volume !== 1 });
                                if (client.volume !== 1) res.volume.setVolume(client.volume);
                                client.musicPlayer.player.play(resource);
                                client.musicPlayer.isPlaying = true;
                                const channel = client.channels.cache.get(client.musicPlayer.textChannel);
                                const eventMessage = await channel.send("Now playing: " + client.queue[0].title);
                            } else {
                                setTimeout(() => {
                                    if (!client.queue.length) {
                                        if (client.musicPlayer.connection) {
                                            client.musicPlayer.connection.destroy();
                                            client.musicPlayer.connection = null;
                                            client.musicPlayer.textChannel = null;
                                            client.playbackChannel = null;
                                            client.musicPlayer.player = null;
                                            client.musicPlayer.isPlaying = false;
                                        }
                                    }
                                }, 60000);
                            }
                        } else {
                            client.musicPlayer.isPlaying = true;
                        }
                    })
                    .on("error", (error) => {
                        const channel = client.channels.cache.get(client.musicPlayer.textChannel);
                        const eventMessage = await channel.send("Error: " + error);
                    });
                const video = client.queue[0].video;
                const videoOption = {
                    id: video.info().options.id,
                    container: "wemb",
                    videoQuality: "none",
                    audioQuality: "highest",
                    mediaBitrate: "highest",
                    metadata: "author,title",
                };
                await video.fetch([videoOption]);
                const audioUrl = video.info().audioStreams[0].url;
                const resource = await createAudioResource(audioUrl, { inlineVolume: client.volume !== 1 });
                if (client.volume !== 1) res.volume.setVolume(client.volume);
                client.musicPlayer.player.play(resource);
                client.musicPlayer.isPlaying = true;
                const channel = client.channels.cache.get(client.musicPlayer.textChannel);
                const eventMessage = await channel.send("Now playing: " + client.queue[0].title);
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
