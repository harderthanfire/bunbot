module.exports = function (client, config) {
    const data = {
        name: "cat",
        description: "Bot gives you a cute cat",
    };

    client.guilds.cache.get(config.guildId)?.commands.create(data);
};
