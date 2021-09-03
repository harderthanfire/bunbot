module.exports = {
    data: {
        name: "dote",
        description: "Dote another user",
        options: [
            {
                name: "target",
                type: "USER",
                description: "The user you want to dote upon",
                required: true,
            },
        ],
    }
};
