module.exports = function (client, config) {
    const data = {
        name: "dutyeventreminder",
        description: "Remind people who reacted about a duty event",
        options: [
            {
                name: "id",
                type: "STRING",
                description: "The id of the event",
                required: true,
            },
            {
                name: "message",
                type: "STRING",
                description: "What you want to tell them",
                required: true,
            },
        ],
    };
    client.guilds.cache.get(config.guildId)?.commands.create(data);
};
