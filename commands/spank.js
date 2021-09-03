const getArgValue = require("../utils/getArgValue.js");

module.exports = {
    async execute(client, interaction) {
        const spanks = require("../utils/loadConfigFile.js")("spank");
        const url = spanks[(spanks.length * Math.random()) | 0];
        const args = interaction.options;
        const textToDisplay = interaction.member.displayName + " spanks <@!" + getArgValue(args, "target") + ">, naughty!";

        require("../utils/sendReply.js")(client, interaction, {
            embeds: [require("../utils/getEmbed.js")(textToDisplay, url)],
        });
    },
    data: {
        name: "spank",
        description: "Spank another user",
        options: [
            {
                name: "target",
                type: "USER",
                description: "The user you want to Spank",
                required: true,
            },
        ],
    },
};
