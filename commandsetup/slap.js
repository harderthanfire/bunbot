module.exports = {
    data: {
        name: "slap",
        description: "Slap another user",
        options: [
            {
                name: "target",
                type: "USER",
                description: "The user you want to slap",
                required: true,
            },
        ],
    }
};
