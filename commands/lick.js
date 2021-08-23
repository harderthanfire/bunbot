const getArgValue = require("../utils/getArgValue.js");

module.exports = async function (client, interaction) {
    const licks = require("../utils/loadConfigFile.js")("lick");
    const url = licks[(licks.length * Math.random()) | 0];
    const args = interaction.options;
    const textToDisplay = interaction.member.displayName + " licks <@!" + getArgValue(args, "target") + ">";

    require("../utils/sendReply.js")(client, interaction,{
        embeds: [require("../utils/getEmbed.js")(textToDisplay, url)],
    });
};
