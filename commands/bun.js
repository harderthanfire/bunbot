const getArgValue = require("../utils/getArgValue.js");

module.exports = async function (client, interaction, config) {
    const buns = require("../utils/loadConfigFile.js")("bun");
    const url = buns[(buns.length * Math.random()) | 0];
    const textToDisplay =
        interaction.member.displayName + " here is your cute bun bun!";

    interaction.reply({
        embeds: [require("../utils/getEmbed.js")(textToDisplay, url)],
    });
};
