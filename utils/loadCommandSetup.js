const fs = require("fs");

module.exports = function (client, config) {
    const commands = [];
    fs.readdirSync("./commandsetup/").forEach((file) => {
        delete require.cache[require.resolve("../commandsetup/" + file)];
        const command = require("../commandsetup/" + file);
        commands.push(command.data.toJSON());
    });
    client.guilds.cache.get(config.guildId)?.commands.set(commands);
};
