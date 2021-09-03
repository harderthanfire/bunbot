const getArgValue = require("../utils/getArgValue.js");
module.exports = {
    async execute(client, interaction) {
        const args = interaction.options;
        const firstUser = await interaction.guild.members.fetch(getArgValue(args, "firstuser"));
        const secondUser = await interaction.guild.members.fetch(getArgValue(args, "seconduser"));
        const seed = +firstUser.id + +secondUser.id;
        const percent = ~~(require("../utils/getRandom.js")(seed) * 100);
        const combinedUser = firstUser.displayName.substring(0, firstUser.displayName.length / 2) + secondUser.displayName.substring(secondUser.displayName.length / 2);
        const textToDisplay = "<@!" + firstUser.id + "> and <@!" + secondUser.id + "> = " + combinedUser + " with a rating of: " + percent + "%!";

        require("../utils/sendReply.js")(client, interaction, {
            embeds: [require("../utils/getEmbed.js")(textToDisplay, "")],
        });
    },
    data: {
        name: "ship",
        description: "Pass in two users to get their compatability scores",
        options: [
            {
                name: "firstuser",
                type: "USER",
                description: "The first user",
                required: true,
            },
            {
                name: "seconduser",
                type: "USER",
                description: "The second user",
                required: true,
            },
        ],
    },
};
