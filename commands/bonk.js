const getArgValue = require("../utils/getArgValue.js");

module.exports = async function (client, interaction) {
    const bonks = require("../utils/loadConfigFile.js")("bonk");
    const url = bonks[(bonks.length * Math.random()) | 0];
    const args = interaction.options;
    const textToDisplay = "Bonk <@!" + getArgValue(args, "target") + "> go to horny jail!";

    require("../utils/sendReply.js")(client, interaction, {
        embeds: [require("../utils/getEmbed.js")(textToDisplay, url)],
    });
};
