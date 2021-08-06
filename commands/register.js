const getArgValue = require("../utils/getArgValue.js");
const saveConfigFile = require("../utils/saveConfigFile.js");
const https = require("https");

module.exports = async function (client, interaction, config) {
    const chars = require("../utils/loadConfigFile.js")("characters") || [];
    const args = interaction.options;

    let edited = false;
    for (const char of chars) {
        if (char.id == interaction.user.id) {
            char.name = getArgValue(args, "charactername");
            char.server = getArgValue(args, "server").replace(" ","");
            edited = true;
            break;
        }
    }

    if (!edited) {
        chars.push({
            id: interaction.user.id,
            name: getArgValue(args, "charactername"),
            server: getArgValue(args, "server").replace(" ", ""),
        });
    }

    saveConfigFile("characters", chars);

    https.get(config.characterUrl + "prepare/name/" + getArgValue(args, "server").replace(" ", "") + "/" + getArgValue(args, "charactername").replace(" ", "%20"), () => {}).on("error", (err) => {
        console.log("Error: " + err.message);
    });

    interaction.reply({ content: "Character registered!", ephemeral: true });
};
