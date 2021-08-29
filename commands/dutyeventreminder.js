const getArgValue = require("../utils/getArgValue.js");

module.exports = async function (client, interaction, config) {
    const args = interaction.options;

    let completed = false;
    const messageId = getArgValue(args, "id");
    if (config.dutyEvents.indexOf(messageId) >= 0) {
        try {
            const channel = client.channels.cache.get(config.dutyEventsChannel);
            const message = await channel.messages.fetch(messageId);
            const reactions = message.reactions.cache;
            let users = [];
            for (const reaction of reactions) {
                for (const user of await reaction[1].users.fetch()) {
                    if (users.indexOf(user) < 0) {
                        users.push(user);
                    }
                }
            }
            let messageText = "";
            for (const user of users) {
                messageText += " <@!" + user[0] + "> "
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
};
