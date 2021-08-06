const getArgValue = require("../utils/getArgValue.js");

module.exports = async function (client, interaction) {
    const thecookies = require("../utils/loadConfigFile.js")("cookie");
    const url = thecookies[(thecookies.length * Math.random()) | 0];
    const args = interaction.options;
    const textToDisplay = interaction.member.displayName + " gives <@!" + getArgValue(args, "target") + "> a cookie!";

    require("../utils/sendReply.js")(client, interaction,{
        embeds: [require("../utils/getEmbed.js")(textToDisplay, url)],
    });
};
