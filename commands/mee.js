module.exports = async function (client, interaction, config) {
    const chars = require("../utils/loadConfigFile.js")("characters") || [];
    let char;

    for (const character of chars) {
        if (character.id === interaction.user.id) {
            char = character;
        }
    }

    if (!char) {
        require("../utils/sendTextReply.js")(client, interaction, "Please register your character using /register!");
        return;
    }

    const url = config.characterUrl + "characters/id/" + char.charid + ".png";
    const textToDisplay = char.name + " looking goooood!";

    require("../utils/sendReply.js")(client, interaction,{
        embeds: [require("../utils/getEmbed.js")(textToDisplay, url)],
    });
};
