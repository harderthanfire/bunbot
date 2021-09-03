const getArgValue = require("../utils/getArgValue.js");

module.exports = {
    async execute(client, interaction) {
        const args = interaction.options;
        const options = (getArgValue(args, "options") || "").split(",");
        const winner = options[(options.length * Math.random()) | 0];

        const textToDisplay = interaction.member.displayName + ": The winner is " + winner + "!!!";

        require("../utils/sendReply.js")(client, interaction, {
            content: textToDisplay,
        });
    },
    data: {
        name: "randompick",
        description: "Let the bot randomly decide things",
        options: [
            {
                name: "options",
                type: "STRING",
                description: "The options you want it to pick from, separated by ,",
                required: true,
            },
        ],
    },
};
