module.exports = function (client, config) {
    const data = {
        name: "reloadcommands",
        description: "Reload all the commands for the bot",
    };
    client.guilds.cache.get(config.guildId)?.commands.create(data);
};
