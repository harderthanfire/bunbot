module.exports = function (client, config) {
    const data = {
        name: "slap",
        description: "Slap another user",
        options: [
            {
                name: "target",
                type: "USER",
                description: "The user you want to slap",
                required: true,
            },
        ],
    };
    client.guilds.cache.get(config.guildId)?.commands.create(data);
};
