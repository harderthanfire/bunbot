module.exports = async function (client, interaction, messageObject) {
    await interaction.editReply(messageObject).catch((e) => {
        console.log(e);
    });
};
