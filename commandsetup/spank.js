module.exports = {
    data: {
        name: "spank",
        description: "Spank another user",
        options: [
            {
                name: "target",
                type: "USER",
                description: "The user you want to Spank",
                required: true,
            },
        ],
    }
};
