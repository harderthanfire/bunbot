const https = require("https");

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

    let textToDisplay = "loading the pretty face..";
    await require("../utils/sendReply.js")(client, interaction, {
        embeds: [require("../utils/getEmbed.js")(textToDisplay, "")],
    });

    https
        .get(config.characterUrl + "prepare/id/" + char.charid, () => {
            textToDisplay = char.name + " looking goooood!";
            const url = config.characterUrl + "characters/id/" + char.charid + ".png?" + Date.now();
            require("../utils/editReply.js")(client, interaction, {
                embeds: [require("../utils/getEmbed.js")(textToDisplay, url)],
            });
        })
        .on("error", (err) => {
            console.log("Error: " + err.message);
        });
};
