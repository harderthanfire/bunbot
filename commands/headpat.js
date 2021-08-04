const getArgValue = require("../utils/getArgValue.js");

module.exports = async function (client, interaction, config) {
    const headpats = require("../utils/loadConfigFile.js")("headpat");
    const url = headpats[(headpats.length * Math.random()) | 0];
    const args = interaction.options;
    const textToDisplay =
        interaction.member.displayName +
        " pats the head of <@!" +
        getArgValue(args, "target") +
        ">";

    interaction.reply({
        embeds: [require("../utils/getEmbed.js")(textToDisplay, url)],
    });
};
