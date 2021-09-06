const getArgValue = require("../utils/getArgValue.js");

module.exports = {
    async execute(client, interaction) {

        await require("../utils/sendReply.js")(client, interaction, { content: "Loading please wait...", ephemeral: true });

        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            require("../utils/editReply.js")(client, interaction, { content: "Please join a voice channel!", ephemeral: true });
            return;
        }
        const args = interaction.options;
        const url = getArgValue(args, "url");

        let queue = client.music.getQueue(interaction.guildId);

        if (!queue) {
            queue = client.music.createQueue(interaction.guildId, interaction.channel, voiceChannel, [], { emit: { trackStart: true } });
        }

        client.music.play(
            queue.id, 
            url,
            {addedBy: interaction.member.displayName}
        );

        require("../utils/editReply.js")(client, interaction, { content: "Track Queued!", ephemeral: true });
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