module.exports = function (client, config) {
    const data = {
        name: "deleteevent",
        description: "Delete an new event",
        options: [
            {
                name: "id",
                type: "STRING",
                description: "The id of the event",
                required: true,
            },
        ],
    };
    client.guilds.cache.get(config.guildId)?.commands.create(data);
};
