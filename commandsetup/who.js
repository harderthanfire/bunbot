module.exports = function (client, config) {
    const data = {
        name: "who",
        description: "Look up the character for another user",
        options: [
            {
                name: "target",
                type: "USER",
                description: "The user you want to see the character of",
                required: true,
            },
        ],
    };
    client.guilds.cache.get(config.guildId)?.commands.create(data);
};
