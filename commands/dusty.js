module.exports = {
    async execute(client, interaction) {
        const dustys = require("../utils/loadConfigFile.js")("dusty");
        const url = dustys[(dustys.length * Math.random()) | 0];
        const textToDisplay = "<@!138340506106200074> get back to doing the MSQ or else!";

        require("../utils/sendReply.js")(client, interaction, {
            embeds: [require("../utils/getEmbed.js")(textToDisplay, url)],
        });
    },
    data: {
        name: "dusty",
        description: "Bot tells dusty to get back to the msq",
    },
};
