module.exports = {
    async execute(client, interaction) {
        const buns = require("../utils/loadConfigFile.js")("bun");
        const url = buns[(buns.length * Math.random()) | 0];
        const textToDisplay = interaction.member.displayName + " here is your cute bun bun!";

        require("../utils/sendReply.js")(client, interaction, {
            embeds: [require("../utils/getEmbed.js")(textToDisplay, url)],
        });
    },
    data: {
        name: "bun",
        description: "Bot gives you a cute bun bun",
    },
};
