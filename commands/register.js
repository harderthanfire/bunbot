const getArgValue = require("../utils/getArgValue.js");
const XIVAPI = require("@xivapi/js");
const xiv = new XIVAPI({
    private_key: "9e6efa9de6ff4bb79fcc3e9638c900fbe52cd6ee170347a48cba2a6c6ea8dff5",
    language: "en",
    snake_case: false,
});
const saveConfigFile = require("../utils/saveConfigFile.js");
const https = require("https");

module.exports = async function (client, interaction, config) {
    const chars = require("../utils/loadConfigFile.js")("characters") || [];
    const args = interaction.options;

    let edited = false;
    await require("../utils/sendReply.js")(client, interaction,{ content: "Registering please wait...", ephemeral: true });
    const res = await xiv.character.search(getArgValue(args, "charactername").trim(), { server: getArgValue(args, "server").trim() });

    if (res && res.Results.length) {
        let charId = res.Results[0].ID;
        for (const char of chars) {
            if (char.id == interaction.user.id) {
                char.name = getArgValue(args, "charactername").trim();
                char.server = getArgValue(args, "server").trim();
                char.charid = charId;
                edited = true;
                break;
            }
        }

        if (!edited) {
            chars.push({
                id: interaction.user.id,
                name: getArgValue(args, "charactername").trim(),
                charid: charId,
                server: getArgValue(args, "server").trim(),
            });
        }

        saveConfigFile("characters", chars);
        require("../utils/editReply.js")(client, interaction,{ content: "Character registered!", ephemeral: true });

        https
            .get(config.characterUrl + "prepare/id/" + charId, () => {})
            .on("error", (err) => {
                console.log("Error: " + err.message);
            });
    } else {
        require("../utils/editReply.js")(client, interaction,{ content: "Failed to get character, please check the name and server!", ephemeral: true });
    }
};
