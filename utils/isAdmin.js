module.exports = async function (client, interaction, config) {
    let hasAuth = false;
    for (const role of interaction.member._roles) {
        if (role == config.adminRoleId) {
            hasAuth = true;
            break;
        }
    }

    return hasAuth;
};
