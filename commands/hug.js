const getArgValue = require("../utils/getArgValue.js");

module.exports = async function (client, interaction) {
    const hugs = require("../utils/loadConfigFile.js")("hug");
    const url = hugs[(hugs.length * Math.random()) | 0];
    const args = interaction.options;
    const textToDisplay = interaction.member.displayName + " hugs <@!" + getArgValue(args, "target") + ">";

    require("../utils/sendReply.js")(client, interaction,{
        embeds: [require("../utils/getEmbed.js")(textToDisplay, url)],
    });
};
