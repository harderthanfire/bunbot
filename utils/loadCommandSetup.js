const fs = require("fs");

module.exports = function (client, config) {
    const commands = [];
    fs.readdirSync("./commandsetup/").forEach((file) => {
        delete require.cache[require.resolve("../commandsetup/" + file)];
        commands.push(require("../commandsetup/" + file).data);
    });
    client.guilds.cache.get(config.guildId)?.commands.set(commands);
};
