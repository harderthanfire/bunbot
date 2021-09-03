module.exports = {
    data: {
        name: "lick",
        description: "Lick someone",
        options: [
            {
                name: "target",
                type: "USER",
                description: "The user you want to lick",
                required: true,
            },
        ],
    }
};
