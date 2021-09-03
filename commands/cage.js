module.exports = {
    async execute(client, interaction) {
        const cages = require("../utils/loadConfigFile.js")("cage");
        const url = cages[(cages.length * Math.random()) | 0];
        const textToDisplay = interaction.member.displayName + " put the bunny back in the box.";

        require("../utils/sendReply.js")(client, interaction, {
            embeds: [require("../utils/getEmbed.js")(textToDisplay, url)],
        });
    },
    data: {
        name: "cage",
        description: "Bot gives you nic cage",
    },
};
