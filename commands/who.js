const getArgValue = require("../utils/getArgValue.js");

module.exports = async function (client, interaction, config) {
    const chars = require("../utils/loadConfigFile.js")("characters") || [];
    let char;
    const args = interaction.options;
    for (const character of chars) {
        if (character.id === getArgValue(args, "target")) {
            char = character;
        }
    }

    if (!char) {
        require("../utils/sendTextReply.js")(client, interaction, "<@!" + getArgValue(args, "target") + "> has not registered their character using /register!");
        return;
    }

    const url = config.characterUrl + "characters/id/" + char.charid + ".png";
    const textToDisplay = char.name + " looks like this";

    require("../utils/sendReply.js")(client, interaction,{
        embeds: [require("../utils/getEmbed.js")(textToDisplay, url)],
    });
};
