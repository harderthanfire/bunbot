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
    }

    const url = config.characterUrl + "characters/name/" + char.server + "/" + char.name.replace(" ", "%20") + ".png";
    const textToDisplay = interaction.member.displayName + " looking goooood!";

    interaction.reply({
        embeds: [require("../utils/getEmbed.js")(textToDisplay, url)],
    });
};
