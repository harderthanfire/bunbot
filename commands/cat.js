const https = require("https");
module.exports = async function (client, interaction) {
    let cats = [];
    await require("../utils/sendReply.js")(client, interaction, { content: "Loading kitty please wait..." });
    https
        .get("https://api.thecatapi.com/v1/images/search?size=full", (resp) => {
            let data = "";

            resp.on("data", (chunk) => {
                data += chunk;
            });

            resp.on("end", () => {
                cats = JSON.parse(data);
                let url = "";

                if (cats && cats.length) {
                    url = cats[0].url;
                }
                const textToDisplay = interaction.member.displayName + " here is your cute kitty!";

                require("../utils/editReply.js")(client, interaction,{
                    embeds: [require("../utils/getEmbed.js")(textToDisplay, url)],
                });
            });
        })
        .on("error", (err) => {
            console.log("Error: " + err.message);
            require("../utils/editReply.js")(client, interaction,{ content: "Unable to load kitty", ephemeral: true });
        });
};
