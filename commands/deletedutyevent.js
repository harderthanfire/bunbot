const saveConfigFile = require("../utils/saveConfigFile.js");
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
                const deleted = await message.delete();

                if (deleted) {
                    config.dutyEvents.splice(config.dutyEvents.indexOf(messageId), 1);
                    saveConfigFile("config", config);
                    completed = true;
                }
            } catch (e) {
                console.log(e);
            }
        }

        let textToDisplay = config.noAuthMessage;

        if (completed) {
            textToDisplay = "Your event was deleted successfully!";
        } else if (!completed) {
            textToDisplay = "An error has occurred when deleting your event, likely a dodgy id!";
        }

        require("../utils/sendTextReply.js")(client, interaction, textToDisplay);
    },
    data: {
        name: "deletedutyevent",
        description: "Delete a duty event",
        options: [
            {
                name: "id",
                type: "STRING",
                description: "The id of the event",
                required: true,
            },
        ],
    },
};
