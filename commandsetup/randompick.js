module.exports = function (client, config) {
    const data = {
        name: "randompick",
        description: "Let the bot randomly decide things",
        options: [
            {
                name: "options",
                type: "STRING",
                description: "The options you want it to pick from, separated by ,",
                required: true,
            },
        ],
    };
    client.guilds.cache.get(config.guildId)?.commands.create(data);
};
