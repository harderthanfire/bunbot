module.exports = function (client, interaction, config) {
    let hasAuth = false;
    for (const role of interaction.member._roles) {
        if (role == config.adminRoleId || role == config.officerRoleId) {
            hasAuth = true;
            break;
        }
    }

    return hasAuth;
};
