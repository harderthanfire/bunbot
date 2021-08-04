const getArgValue = require("../utils/getArgValue.js");

module.exports = async function (client, interaction, config) {
    const args = interaction.options;
    const hasAuth = require("../utils/isAdminOrOfficer.js")(
        client,
        interaction,
        config
    );

    let completed = false;

    const messageId = getArgValue(args, "id");
    if (config.events.indexOf(messageId) >= 0) {
        try {
            const channel = client.channels.cache.get(config.eventsChannel);
            const message = await channel.messages.fetch(messageId);

            let messageText =
                "@everyone " +
                getArgValue(args, "title") +
                " <a:yay:862723815472627732>";
            messageText +=
                "\n\r:question: What: " + getArgValue(args, "description");
            messageText +=
                "\n\r:clock1: When: " +
                getArgValue(args, "date") +
                " " +
                getArgValue(args, "time") +
                " Server Time";
            messageText +=
                "\n\r Please react with " +
                getArgValue(args, "emoji") +
                " if you want to join!";

            const eventMessage = await message.edit(messageText);

            if (eventMessage) {
                eventMessage.react(getArgValue(args, "emoji"));
                completed = true;
            }
        } catch (e) {
            console.log(e);
        }
    }
    let textToDisplay = config.noAuthMessage;

    if (hasAuth && completed) {
        textToDisplay =
            "Your event was edited successfully! The id is: " + messageId;
    } else if (hasAuth && !completed) {
        textToDisplay = "An error has occurred when editing your event!";
    }

    require("../utils/sendTextReply.js")(client, interaction, textToDisplay);
};
