const getArgValue = require("../utils/getArgValue.js");

module.exports = {
    async execute(client, interaction) {

        let queue = client.music.getQueue(interaction.guildId);

        if (!queue) {
            require("../utils/sendReply.js")(client, interaction, { content: "Nothing is playing!", ephemeral: true });
            return;
        }

        const args = interaction.options;
        const volume = getArgValue(args, "vol");

        queue.setVolume(volume);

        require("../utils/sendTextReply.js")(client, interaction, "Volume has been set to " + volume);
    },
    data: {
        name: "volume",
        description: "Set the music playback volume of the bot",
        options: [
            {
                name: "vol",
                type: "STRING",
                description: "The new volume to set, between 0 and 200",
                required: true,
            },
        ],
    },
};
