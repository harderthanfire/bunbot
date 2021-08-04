module.exports = function (client, config) {
    const data = {
        name: "egg",
        description: "Give someone an egg",
        options: [
            {
                name: "target",
                type: "USER",
                description: "The user you want to egg",
                required: true,
            },
        ],
    };
    client.guilds.cache.get(config.guildId)?.commands.create(data);
};
