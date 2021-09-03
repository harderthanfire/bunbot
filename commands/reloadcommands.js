module.exports = {
    async execute(client, interaction, config) {
        const hasAuth = require("../utils/isAdminOrOfficer.js")(client, interaction, config);
        const textToDisplay = hasAuth ? "commands have been reloaded! " : config.noAuthMessage;
        if (hasAuth) {
            config.commandLookup = require("../utils/loadCommands.js")(client, config);
        }
        require("../utils/sendTextReply.js")(client, interaction, textToDisplay);
    },
    data: {
        name: "reloadcommands",
        description: "Reload all the commands for the bot",
    },
};
