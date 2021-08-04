module.exports = function (client, interaction, text) {
    interaction.reply({
        content: interaction.member.displayName + ": " + text,
    });
};
