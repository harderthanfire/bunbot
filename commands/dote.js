const getArgValue = require("../utils/getArgValue.js");

module.exports = {
    async execute(client, interaction) {
        const dotes = require("../utils/loadConfigFile.js")("dote");
        const url = dotes[(dotes.length * Math.random()) | 0];
        const args = interaction.options;
        const textToDisplay = interaction.member.displayName + " dotes upon <@!" + getArgValue(args, "target") + ">";

        require("../utils/sendReply.js")(client, interaction, {
            embeds: [require("../utils/getEmbed.js")(textToDisplay, url)],
        });
    },
    data: {
        name: "dote",
        description: "Dote another user",
        options: [
            {
                name: "target",
                type: "USER",
                description: "The user you want to dote upon",
                required: true,
            },
        ],
    },
};
