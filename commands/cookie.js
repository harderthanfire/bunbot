const getArgValue = require("../utils/getArgValue.js");

module.exports = async function (client, interaction, config) {
    const thecookies = require("../utils/loadConfigFile.js")("cookie");
    const url = thecookies[(thecookies.length * Math.random()) | 0];
    const args = interaction.options;
    const textToDisplay = interaction.member.displayName + " gives <@!" + getArgValue(args, "target") + "> a cookie!";

    interaction.reply({
        embeds: [require("../utils/getEmbed.js")(textToDisplay, url)],
    });
};
