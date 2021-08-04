const getArgValue = require("../utils/getArgValue.js");

module.exports = async function (client, interaction, config) {
    const dotes = require("../utils/loadConfigFile.js")("dote");
    const url = dotes[(dotes.length * Math.random()) | 0];
    const args = interaction.options;
    const textToDisplay =
        interaction.member.displayName +
        " dotes upon <@!" +
        getArgValue(args, "target") +
        ">";

    interaction.reply({
        embeds: [require("../utils/getEmbed.js")(textToDisplay, url)],
    });
};
