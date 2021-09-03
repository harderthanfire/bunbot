const fs = require("fs");

module.exports = function (client, config) {
    const commandsetup = [];
    const commandsLookup = {};
    fs.readdirSync("./commands/").forEach((file) => {
        const fileNoBs = file.replace(".js", "");
        delete require.cache[require.resolve("../commands/" + file)];
        const command = require("../commands/" + file);
        commandsetup.push(command.data);
        commandsLookup[fileNoBs] = command.execute;
    });
    client.guilds.cache.get(config.guildId)?.commands.set(commandsetup);
    return commandsLookup;
};