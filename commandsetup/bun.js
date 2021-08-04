module.exports = function (client, config) {
    const data = {
        name: "bun",
        description: "Bot gives you a cute bun bun",
    };

    client.guilds.cache.get(config.guildId)?.commands.create(data);
};
