module.exports = function (client, config) {
    const data = {
        name: "deletedutyevent",
        description: "Delete a duty event",
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
