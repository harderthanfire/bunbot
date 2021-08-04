const getArgValue = require("../utils/getArgValue.js");

module.exports = async function (client, interaction) {
    const spanks = require("../utils/loadConfigFile.js")("spank");
    const url = spanks[(spanks.length * Math.random()) | 0];
    const args = interaction.options;
    const textToDisplay = interaction.member.displayName + " spanks <@!" + getArgValue(args, "target") + ">, naughty!";

    interaction.reply({
        embeds: [require("../utils/getEmbed.js")(textToDisplay, url)],
    });
};
