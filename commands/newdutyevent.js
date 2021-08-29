const saveConfigFile = require("../utils/saveConfigFile.js");
const getArgValue = require("../utils/getArgValue.js");

module.exports = async function (client, interaction, config) {
    const args = interaction.options;

    let completed = false;

    let messageText = getArgValue(args, "title") + " <a:yay:862723815472627732>";
    messageText += "\n\r:question: What: " + getArgValue(args, "description");
    messageText += "\n\r:clock1: When: " + getArgValue(args, "date") + " " + getArgValue(args, "time") + " Server Time";
    messageText += "\n\r Please react with " + getArgValue(args, "emoji") + " if you want to join!";
    let eventMessageId = "";
    try {
        const channel = client.channels.cache.get(config.dutyEventsChannel);
        const eventMessage = await channel.send(messageText);

        if (eventMessage) {
            eventMessageId = eventMessage.id;
            completed = true;
            eventMessage.react(getArgValue(args, "emoji"));
            config.dutyEvents.push(eventMessage.id);
            saveConfigFile("config", config);
        }
    } catch (e) {
        console.log(e);
    }

    let textToDisplay = config.noAuthMessage;

    if (completed) {
        textToDisplay = "Your event was added successfully! The id is: " + eventMessageId;
    } else if (!completed) {
        textToDisplay = "An error has occurred when adding your event!";
    }

    require("../utils/sendTextReply.js")(client, interaction, textToDisplay);
};
