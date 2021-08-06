module.exports = async function (client, interaction, text) {
    interaction
        .reply({
            content: interaction.member.displayName + ": " + text,
        })
        .catch((e) => {
            console.log(e);
        });
};
