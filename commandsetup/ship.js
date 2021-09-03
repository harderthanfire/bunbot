module.exports = function (client, config) {
    const data = {
        name: "ship",
        description: "Pass in two users to get their compatability scores",
        options: [
            {
                name: "firstuser",
                type: "USER",
                description: "The first user",
                required: true,
            },
            {
                name: "seconduser",
                type: "USER",
                description: "The second user",
                required: true,
            },
        ],
    };
    client.guilds.cache.get(config.guildId)?.commands.create(data);
};
