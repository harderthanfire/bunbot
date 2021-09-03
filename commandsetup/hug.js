module.exports = {
    data: {
        name: "hug",
        description: "Hug another user",
        options: [
            {
                name: "target",
                type: "USER",
                description: "The user you want to hug",
                required: true,
            },
        ],
    }
};
