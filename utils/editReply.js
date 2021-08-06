module.exports = async function (client, interaction, messageObject) {
    interaction.editReply(messageObject).catch((e) => {
        console.log(e);
    });
};
