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
            char.server = getArgValue(args, "server");
            edited = true;
            break;
        }
    }

    if (!edited) {
        chars.push({
            id: interaction.user.id,
            name: getArgValue(args, "charactername"),
            server: getArgValue(args, "server"),
        });
    }

    const options = {
        hostname: config.characterUrl,
        port: 443,
        path: "/prepare/name/" + getArgValue(args, "server") + "/" + getArgValue(args, "charactername").replace(" ", "%20"),
        method: "GET",
    };

    const req = https.request(options, () => {});
    req.end();

    saveConfigFile("characters", chars);

    interaction.reply({ content: "Character registered!", ephemeral: true });
};
