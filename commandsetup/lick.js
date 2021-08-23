module.exports = function (client, config) {
    const data = {
        name: "lick",
        description: "Lick someone",
        options: [
            {
                name: "target",
                type: "USER",
                description: "The user you want to lick",
                required: true,
            },
        ],
    };
    client.guilds.cache.get(config.guildId)?.commands.create(data);
};
