const getArgValue = require("../utils/getArgValue.js");
const https = require("https");

module.exports = {
    async execute(client, interaction, config) {
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

        let textToDisplay = "loading the pretty face..";
        await require("../utils/sendReply.js")(client, interaction, {
            embeds: [require("../utils/getEmbed.js")(textToDisplay, "")],
        });

        https
            .get(config.characterUrl + "prepare/id/" + char.charid, () => {
                textToDisplay = char.name + " looks like this";
                const url = config.characterUrl + "characters/id/" + char.charid + ".png?" + Date.now();
                require("../utils/editReply.js")(client, interaction, {
                    embeds: [require("../utils/getEmbed.js")(textToDisplay, url)],
                });
            })
            .on("error", (err) => {
                console.log("Error: " + err.message);
            });
    },
    data: {
        name: "who",
        description: "Look up the character for another user",
        options: [
            {
                name: "target",
                type: "USER",
                description: "The user you want to see the character of",
                required: true,
            },
        ],
    },
};
