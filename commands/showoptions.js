const getArgValue = require("../utils/getArgValue.js");

module.exports = {
    async execute(client, interaction, config) {
        const args = interaction.options;
        const hasAuth = require("../utils/isAdminOrOfficer.js")(client, interaction, config);

        if (!hasAuth) {
            require("../utils/sendReply.js")(client, interaction, { content: "You are not allowed to use that command!", ephemeral: true });
            return;
        }

        const numOptions = getArgValue(args, "num");
        const emojis = [":one:", ":two:", ":three:", ":four:", ":five:"];

        let messageText = "Please select from one of the following options: ";
        for (let i = 0; i < numOptions; i++) {
            messageText += "\n\rOption " + i + ": " + emojis[i];
        }

        try {
            const channel = client.channels.cache.get(interaction.channelId);
            const message = await channel.send(messageText);

            if (message) {        
                for (let k = 0; k < numOptions; k++) {
                    message.react(emojis[k]);
                }

            }
        } catch (e) {
            console.log(e);
        }

        require("../utils/sendReply.js")(client, interaction, { content: "Options sent!", ephemeral: true });
    },
    data: {
        name: "showoptions",
        description: "Show a set of options people can vote on",
        options: [
            {
                name: "num",
                type: "INTEGER",
                description: "The number of options to add - should be between 2 and 5",
                required: true,
                choices: [2,3,4,5],
            },
        ],
    },
};
