module.exports = {
    async execute(client, interaction) {
        if (!client.queue.length) {
            require("../utils/sendReply.js")(client, interaction, { content: "Nothing is playing!", ephemeral: true });
            return;
        }

        const outputLine = [];
        let count = 1;
        for (const song of client.queue) {
            const line = count + ". " + song.title + " (" + song.duration + ") - " + song.requester;
            outputLine.push(line);
            count++;
        }

        require("../utils/sendTextReply.js")(client, interaction, "\n" + outputLine.join("\n"));
    },
    data: {
        name: "queue",
        description: "List what is currently playing",
    },
};
