const https = require("https");
module.exports = {
    async execute(client, interaction) {
        let dogs = [];
        await require("../utils/sendReply.js")(client, interaction, { content: "Loading doggo please wait..." });
        https
            .get("https://api.thedogapi.com/v1/images/search?size=full", (resp) => {
                let data = "";

                resp.on("data", (chunk) => {
                    data += chunk;
                });

                resp.on("end", () => {
                    try {
                        dogs = JSON.parse(data);
                    } catch (err) {
                        console.log("Error: " + err.message);
                        require("../utils/editReply.js")(client, interaction, { content: "Unable to load doggo", ephemeral: true });
                        return;
                    }

                    let url = "";

                    if (dogs && dogs.length) {
                        url = dogs[0].url;
                    }
                    const textToDisplay = interaction.member.displayName + ", here is your cute doggo!";

                    require("../utils/editReply.js")(client, interaction, { content: " ", embeds: [require("../utils/getEmbed.js")(textToDisplay, url)] });
                });
            })
            .on("error", (err) => {
                console.log("Error: " + err.message);
                require("../utils/editReply.js")(client, interaction, { content: "Unable to load doggo", ephemeral: true });
            });
    },
    data: {
        name: "dog",
        description: "Bot gives you a cute doggo",
    },
};
