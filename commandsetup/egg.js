module.exports = {
    data: {
        name: "egg",
        description: "Give someone an egg",
        options: [
            {
                name: "target",
                type: "USER",
                description: "The user you want to egg",
                required: true,
            },
        ],
    }
};
