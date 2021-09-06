module.exports = {
    async execute(client, interaction) {

        let queue = client.music.getQueue(interaction.guildId);

        if (!queue) {
            require("../utils/sendReply.js")(client, interaction, { content: "Nothing is playing!", ephemeral: true });
            return;
        }

        queue.skipTrack();

        require("../utils/sendTextReply.js")(client, interaction, "Song has been skipped!");
    },
    data: {
        name: "skip",
        description: "Skip to the next song"
    },
};
