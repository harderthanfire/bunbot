module.exports = function (client, config) {
    const data = {
        name: "ping",
        description: "Bot responds with pong",
    };

    client.guilds.cache.get(config.guildId)?.commands.create(data);
};
