module.exports = function (client, config) {
    const data = {
        name: "dote",
        description: "Dote another user",
        options: [
            {
                name: "target",
                type: "USER",
                description: "The user you want to dote upon",
                required: true,
            },
        ],
    };
    client.guilds.cache.get(config.guildId)?.commands.create(data);
};
