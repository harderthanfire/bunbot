module.exports = function (client, config) {
    const data = {
        name: "dusty",
        description: "Bot tells dusty to get back to the msq",
    };

    client.guilds.cache.get(config.guildId)?.commands.create(data);
};
