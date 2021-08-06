module.exports = async function (client, interaction, messageObject) {
    await interaction.reply(messageObject).catch((e) => {
        console.log(e);
    });
};
