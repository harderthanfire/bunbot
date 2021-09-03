const getArgValue = require("../utils/getArgValue.js");

module.exports = {
    async execute(client, interaction) {
        const headpats = require("../utils/loadConfigFile.js")("headpat");
        const url = headpats[(headpats.length * Math.random()) | 0];
        const args = interaction.options;
        const textToDisplay = interaction.member.displayName + " pats the head of <@!" + getArgValue(args, "target") + ">";

        require("../utils/sendReply.js")(client, interaction, {
            embeds: [require("../utils/getEmbed.js")(textToDisplay, url)],
        });
    },
    data: {
        name: "headpat",
        description: "Pat the head of someone",
        options: [
            {
                name: "target",
                type: "USER",
                description: "The user you want to pet",
                required: true,
            },
        ],
    },
};
