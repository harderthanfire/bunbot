const getArgValue = require("../utils/getArgValue.js");

module.exports = {
    async execute(client, interaction) {
        const slaps = require("../utils/loadConfigFile.js")("slap");
        const url = slaps[(slaps.length * Math.random()) | 0];
        const args = interaction.options;
        const textToDisplay = interaction.member.displayName + " slaps <@!" + getArgValue(args, "target") + "> super hard";

        require("../utils/sendReply.js")(client, interaction, {
            embeds: [require("../utils/getEmbed.js")(textToDisplay, url)],
        });
    },
    data: {
        name: "slap",
        description: "Slap another user",
        options: [
            {
                name: "target",
                type: "USER",
                description: "The user you want to slap",
                required: true,
            },
        ],
    },
};
