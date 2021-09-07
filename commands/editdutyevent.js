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

                let messageText = "@everyone " + getArgValue(args, "title") + " <a:yay:862723815472627732>";
                messageText += "\n\r:question: What: " + getArgValue(args, "description");
                messageText += "\n\r:clock1: When: " + getArgValue(args, "date") + " " + getArgValue(args, "time") + " Server Time";
                messageText += "\n\r Please react with " + getArgValue(args, "emoji") + " if you want to join!";

                const eventMessage = await message.edit(messageText);

                if (eventMessage) {
                    eventMessage.react(getArgValue(args, "emoji"));
                    completed = true;
                }
            } catch (e) {
                console.log(e);
            }
        }
        let textToDisplay = "An error has occurred when editing your event!";

        if (completed) {
            textToDisplay = "Your event was edited successfully! The id is: " + messageId;
        }
        
        require("../utils/sendTextReply.js")(client, interaction, textToDisplay);
    },
    data: {
        name: "editdutyevent",
        description: "Edit an duty existing event",
        options: [
            {
                name: "id",
                type: "STRING",
                description: "The messageid of the event",
                required: true,
            },
            {
                name: "title",
                type: "STRING",
                description: "The title of the event",
                required: true,
            },
            {
                name: "date",
                type: "STRING",
                description: "Date when the event will happen - server time",
                required: true,
            },
            {
                name: "time",
                type: "STRING",
                description: "Time when the event will happen - server time",
                required: true,
            },
            {
                name: "description",
                type: "STRING",
                description: "Description of the event",
                required: true,
            },
            {
                name: "emoji",
                type: "STRING",
                description: "Emoji used to confirm signup to the event",
                required: true,
            },
        ],
    },
};
