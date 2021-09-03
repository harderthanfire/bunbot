module.exports = {
    data: {
        name: "bonk",
        description: "Bonk another user",
        options: [
            {
                name: "target",
                type: "USER",
                description: "The user you want to bonk",
                required: true,
            },
        ],
    }
};
