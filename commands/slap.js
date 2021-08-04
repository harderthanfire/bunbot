const getArgValue = require("../utils/getArgValue.js");

module.exports = async function (client, interaction) {
    const slaps = require("../utils/loadConfigFile.js")("slap");
    const url = slaps[(slaps.length * Math.random()) | 0];
    const args = interaction.options;
    const textToDisplay = interaction.member.displayName + " slaps <@!" + getArgValue(args, "target") + "> super hard";

    interaction.reply({
        embeds: [require("../utils/getEmbed.js")(textToDisplay, url)],
    });
};
