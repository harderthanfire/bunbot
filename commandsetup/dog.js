module.exports = function (client, config) {
    const data = {
        name: "dog",
        description: "Bot gives you a cute doggo",
    };

    client.guilds.cache.get(config.guildId)?.commands.create(data);
};
