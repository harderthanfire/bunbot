const getArgValue = require("../utils/getArgValue.js");
module.exports = async function (client, interaction) {
    const args = interaction.options;
    const firstUser = await interaction.guild.members.fetch(getArgValue(args, "firstUser"));
    const secondUser = await interaction.guild.members.fetch(getArgValue(args, "secondUser"));
    const seed = firstUser.id + secondUser.id;
    const percent = ~~(require("../utils/getRandom.js")(seed) * 100);
    const combinedUser = firstUser.nickname.substring(0, firstUser.length / 2) + secondUser.nickname.substring(secondUser.length / 2);
    const textToDisplay = "<@!" + firstUser.id + "> and <@!" + secondUser.id + "> = " + combinedUser + " with a rating of: " + percent + "%!";

    require("../utils/sendReply.js")(client, interaction, {
        embeds: [require("../utils/getEmbed.js")(textToDisplay, "")],
    });
};
