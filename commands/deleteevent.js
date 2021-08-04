const saveConfigFile = require("../utils/saveConfigFile.js");
const getArgValue = require("../utils/getArgValue.js");

module.exports = async function (client, interaction, config) {
    const args = interaction.options;
    const hasAuth = require("../utils/isAdminOrOfficer.js")(client, interaction, config);

    let completed = false;
    const messageId = getArgValue(args, "id");
    if (config.events.indexOf(messageId) >= 0) {
        try {
            const channel = client.channels.cache.get(config.eventsChannel);
            const message = await channel.messages.fetch(messageId);
            const deleted = await message.delete();

            if (deleted) {
                config.events.splice(config.events.indexOf(messageId), 1);
                saveConfigFile("config", config);
                completed = true;
            }
        } catch (e) {
            console.log(e);
        }
    }

    let textToDisplay = config.noAuthMessage;

    if (hasAuth && completed) {
        textToDisplay = "Your event was deleted successfully!";
    } else if (hasAuth && !completed) {
        textToDisplay = "An error has occurred when deleting your event, likely a dodgy id!";
    }

    require("../utils/sendTextReply.js")(client, interaction, textToDisplay);
};
