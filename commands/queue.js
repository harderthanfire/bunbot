module.exports = {
    async execute(client, interaction) {

        let queue = client.music.getQueue(interaction.guildId);

        if (!queue) {
            require("../utils/sendReply.js")(client, interaction, { content: "Nothing is playing!", ephemeral: true });
            return;
        }

        const shownQueue = queue.showQueue({
            limit: 100,
            show: {
                queueNumber: true,
                addedBy: true,
                align: true,
                alignmentSpace: 70
            }
        });

        require("../utils/sendTextReply.js")(client, interaction, shownQueue.join('\n'));
    },
    data: {
        name: "queue",
        description: "List what is currently playing"
    },
};
