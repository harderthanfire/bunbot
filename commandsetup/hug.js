module.exports = function (client, config) {
    const data = {
        name: "hug",
        description: "Hug another user",
        options: [
            {
                name: "target",
                type: "USER",
                description: "The user you want to hug",
                required: true,
            },
        ],
    };
    client.guilds.cache.get(config.guildId)?.commands.create(data);
};
