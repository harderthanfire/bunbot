module.exports = function (client, config) {
    const data = {
        name: "cookie",
        description: "Give someone a cookie",
        options: [
            {
                name: "target",
                type: "USER",
                description: "The user you want to cookie",
                required: true,
            },
        ],
    };
    client.guilds.cache.get(config.guildId)?.commands.create(data);
};
