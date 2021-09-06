module.exports = {
    async execute(client, interaction) {

        let queue = client.music.getQueue(interaction.guildId);

        if (!queue) {
            require("../utils/sendReply.js")(client, interaction, { content: "Nothing is playing!", ephemeral: true });
            return;
        }

        queue.leave();
        client.music.deleteQueue(interaction.guildId);
        require("../utils/sendTextReply.js")(client, interaction, "Music stopped!");
    },
    data: {
        name: "stop",
        description: "Stop the bot playing"
    },
};
