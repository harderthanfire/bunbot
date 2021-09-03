const getArgValue = require("../utils/getArgValue.js");

module.exports = {
    async execute(client, interaction, config) {
        const args = interaction.options;

        let completed = false;
        const messageId = getArgValue(args, "id");
        if (config.dutyEvents.indexOf(messageId) >= 0) {
            try {
                const channel = client.channels.cache.get(config.dutyEventsChannel);
                const message = await channel.messages.fetch(messageId);
                let users = [];
                let reactions = [];
                await message.reactions.cache.each((reaction) => {
                    reactions.push(reaction);
                });
                for (const reaction of reactions) {
                    const theUsers = await reaction.users.fetch();
                    theUsers.each((user) => {
                        if (users.indexOf(user) < 0) users.push(user);
                    });
                }

                let messageText = "";
                for (const user of users) {
                    messageText += " <@!" + user.id + "> ";
                }
                messageText += "\n\r" + getArgValue(args, "message");
                messageText += "\n\r" + message.url;

                try {
                    await channel.send(messageText);
                    completed = true;
                } catch (e) {
                    console.log(e);
                }
            } catch (e) {
                console.log(e);
            }
        }

        let textToDisplay = "Your reminder was sent successfully!";

        if (!completed) {
            textToDisplay = "An error has occurred when reminding of your event, likely a dodgy id!";
        }

        require("../utils/sendTextReply.js")(client, interaction, textToDisplay);
    },
    data: {
        name: "dutyeventreminder",
        description: "Remind people who reacted about a duty event",
        options: [
            {
                name: "id",
                type: "STRING",
                description: "The id of the event",
                required: true,
            },
            {
                name: "message",
                type: "STRING",
                description: "What you want to tell them",
                required: true,
            },
        ],
    },
};
