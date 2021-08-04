const getArgValue = require("../utils/getArgValue.js");

module.exports = async function (client, interaction, config) {
    const bonks = require("../utils/loadConfigFile.js")("bonk");
    const url = bonks[(bonks.length * Math.random()) | 0];
    const args = interaction.options;
    const textToDisplay = "Bonk <@!" + getArgValue(args, "target") + "> go to horny jail!";

    interaction.reply({
        embeds: [require("../utils/getEmbed.js")(textToDisplay, url)],
    });
};
