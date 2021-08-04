const saveConfigFile = require("../utils/saveConfigFile.js");
const getArgValue = require("../utils/getArgValue.js");

module.exports = async function (client, interaction, config) {
    const args = interaction.options;
    const hasAuth = require("../utils/isAdminOrOfficer.js")(
        client,
        interaction,
        config
    );

    let completed = false;

    let messageText =
        "@everyone " +
        getArgValue(args, "title") +
        " <a:yay:862723815472627732>";
    messageText += "\n\r:question: What: " + getArgValue(args, "description");
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
    let eventMessageId = "";
    try {
        const channel = client.channels.cache.get(config.eventsChannel);
        const eventMessage = await channel.send(messageText);

        if (eventMessage) {
            eventMessageId = eventMessage.id;
            completed = true;
            eventMessage.react(getArgValue(args, "emoji"));
            config.events.push(eventMessage.id);
            saveConfigFile("config", config);
        }
    } catch (e) {
        console.log(e);
    }

    let textToDisplay = config.noAuthMessage;

    if (hasAuth && completed) {
        textToDisplay =
            "Your event was added successfully! The id is: " + eventMessageId;
    } else if (hasAuth && !completed) {
        textToDisplay = "An error has occurred when adding your event!";
    }

    require("../utils/sendTextReply.js")(client, interaction, textToDisplay);
};
