const getArgValue = require("../utils/getArgValue.js");

module.exports = {
    async execute(client, interaction) {
        const bonks = require("../utils/loadConfigFile.js")("bonk");
        const url = bonks[(bonks.length * Math.random()) | 0];
        const args = interaction.options;
        const textToDisplay = "Bonk <@!" + getArgValue(args, "target") + "> go to horny jail!";

        require("../utils/sendReply.js")(client, interaction, {
            embeds: [require("../utils/getEmbed.js")(textToDisplay, url)],
        });
    },
    data: {
        name: "bonk",
        description: "Bonk another user",
        options: [
            {
                name: "target",
                type: "USER",
                description: "The user you want to bonk",
                required: true,
            },
        ],
    },
};
