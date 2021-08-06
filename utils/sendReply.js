module.exports = async function (client, interaction, messageObject) {
    interaction.reply(messageObject).catch((e) => {
        console.log(e);
    });
};
