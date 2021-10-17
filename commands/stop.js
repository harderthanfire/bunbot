module.exports = {
    async execute(client, interaction) {
        if (!client.queue.length || !client.musicPlayer.connection || !client.musicPlayer.player) {
            require("../utils/sendReply.js")(client, interaction, { content: "Nothing is playing!", ephemeral: true });
            return;
        }
        if (client.musicPlayer.connection) {
            client.musicPlayer.connection.destroy();
        }
        client.queue = [];
        client.playbackChannel = null;
        client.musicPlayer = {};
        require("../utils/sendTextReply.js")(client, interaction, "Music stopped!");
    },
    data: {
        name: "stop",
        description: "Stop the bot playing",
    },
};
