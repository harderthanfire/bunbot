const getArgValue = require("../utils/getArgValue.js");

module.exports = async function (client, interaction, config) {
    const eggs = require("../utils/loadConfigFile.js")("egg");
    const url = eggs[(eggs.length * Math.random()) | 0];
    const args = interaction.options;
    const textToDisplay =
        interaction.member.displayName +
        " gives <@!" +
        getArgValue(args, "target") +
        "> an egg in this trying time";

    interaction.reply({
        embeds: [require("../utils/getEmbed.js")(textToDisplay, url)],
    });
};
