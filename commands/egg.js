const getArgValue = require("../utils/getArgValue.js");

module.exports = {
    async execute(client, interaction) {
        const eggs = require("../utils/loadConfigFile.js")("egg");
        const url = eggs[(eggs.length * Math.random()) | 0];
        const args = interaction.options;
        const textToDisplay = interaction.member.displayName + " gives <@!" + getArgValue(args, "target") + "> an egg in this trying time";

        require("../utils/sendReply.js")(client, interaction, {
            embeds: [require("../utils/getEmbed.js")(textToDisplay, url)],
        });
    },
    data: {
        name: "egg",
        description: "Give someone an egg",
        options: [
            {
                name: "target",
                type: "USER",
                description: "The user you want to egg",
                required: true,
            },
        ],
    },
};
