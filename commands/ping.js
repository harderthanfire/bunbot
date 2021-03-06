module.exports = {
    async execute(client, interaction, config) {
        const hasAuth = require("../utils/isAdminOrOfficer.js")(client, interaction, config);
        const textToDisplay = hasAuth ? "Pong! " : config.noAuthMessage;
        require("../utils/sendTextReply.js")(client, interaction, textToDisplay);
    },
    data: {
        name: "ping",
        description: "Bot responds with pong",
    },
};
