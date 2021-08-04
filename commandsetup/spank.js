module.exports = function (client, config) {
    const data = {
        name: "spank",
        description: "Spank another user",
        options: [
            {
                name: "target",
                type: "USER",
                description: "The user you want to Spank",
                required: true,
            },
        ],
    };
    client.guilds.cache.get(config.guildId)?.commands.create(data);
};
