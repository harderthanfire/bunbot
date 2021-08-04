module.exports = function (client, config) {
    const data = {
        name: "bonk",
        description: "Bonk another user",
        options: [
            {
                name: "target",
                type: "USER",
                description: "The user you want to bonk",
                required: true,
            },
        ],
    };
    client.guilds.cache.get(config.guildId)?.commands.create(data);
};
