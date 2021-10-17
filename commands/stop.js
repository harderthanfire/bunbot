module.exports = {
    async execute(client, interaction) {
        if (!client.queue.length || !client.musicPlayer.connection || !client.musicPlayer.player) {
            require("../utils/sendReply.js")(client, interaction, { content: "Nothing is playing!", ephemeral: true });
            return;
        }
        if (client.musicPlayer.connection) {
            client.musicPlayer.connection.destroy();
        }
        client.musicPlayer.connection = null;
        client.musicPlayer.textChannel = null;
        client.playbackChannel = null;
        client.musicPlayer.player = null;
        client.musicPlayer.isPlaying = false;
        client.queue = [];
        require("../utils/sendTextReply.js")(client, interaction, "Music stopped!");
    },
    data: {
        name: "stop",
        description: "Stop the bot playing",
    },
};
