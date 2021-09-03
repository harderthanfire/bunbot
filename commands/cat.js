const https = require("https");
module.exports = {
    async execute(client, interaction) {
        let cats = [];
        await require("../utils/sendReply.js")(client, interaction, { content: "Loading kitty please wait..." });
        https
            .get("https://cataas.com/cat?json=true", (resp) => {
                let data = "";

                resp.on("data", (chunk) => {
                    data += chunk;
                });

                resp.on("end", () => {
                    try {
                        cats = JSON.parse(data);
                    } catch (err) {
                        console.log("Error: " + err.message);
                        require("../utils/editReply.js")(client, interaction, { content: "Unable to load kitty", ephemeral: true });
                        return;
                    }
                    let url = "";

                    if (cats) {
                        url = "https://cataas.com" + cats.url;
                    }
                    const textToDisplay = interaction.member.displayName + ", here is your cute kitty!";

                    require("../utils/editReply.js")(client, interaction, { content: " ", embeds: [require("../utils/getEmbed.js")(textToDisplay, url)] });
                });
            })
            .on("error", (err) => {
                console.log("Error: " + err.message);
                require("../utils/editReply.js")(client, interaction, { content: "Unable to load kitty", ephemeral: true });
            });
    },
    data: {
        name: "cat",
        description: "Bot gives you a cute cat",
    },
};
