module.exports = function (client, config) {
    const data = {
        name: "cage",
        description: "Bot gives you nic cage",
    };

    client.guilds.cache.get(config.guildId)?.commands.create(data);
};
