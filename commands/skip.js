module.exports = {
    async execute(client, interaction) {
        if (!client.queue.length || !client.musicPlayer.player) {
            require("../utils/sendReply.js")(client, interaction, { content: "Nothing is playing!", ephemeral: true });
            return;
        }

        client.musicPlayer.player.stop();

        require("../utils/sendTextReply.js")(client, interaction, "Song has been skipped!");
    },
    data: {
        name: "skip",
        description: "Skip to the next song",
    },
};
