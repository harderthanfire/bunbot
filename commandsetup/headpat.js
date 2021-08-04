module.exports = function (client, config) {
    const data = {
        name: "headpat",
        description: "Pat the head of someone",
        options: [
            {
                name: "target",
                type: "USER",
                description: "The user you want to pet",
                required: true,
            },
        ],
    };
    client.guilds.cache.get(config.guildId)?.commands.create(data);
};
