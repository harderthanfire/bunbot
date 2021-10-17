const getArgValue = require("../utils/getArgValue.js");

module.exports = {
    async execute(client, interaction) {
        const args = interaction.options;
        let volume = getArgValue(args, "vol");

        if (+volume > 200) {
            volume = 200;
        } else if (+volume < 0) {
            volume = 0;
        }

        client.volume = +volume / 100;

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
