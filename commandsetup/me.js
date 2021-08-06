module.exports = function (client, config) {
    const data = {
        name: "me",
        description: "Bot shows you yourself",
    };

    client.guilds.cache.get(config.guildId)?.commands.create(data);
};
