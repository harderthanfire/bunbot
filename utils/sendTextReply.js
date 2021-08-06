module.exports = async function (client, interaction, text) {
    await interaction
        .reply({
            content: interaction.member.displayName + ": " + text,
        })
        .catch((e) => {
            console.log(e);
        });
};
