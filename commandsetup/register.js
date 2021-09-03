module.exports = {
    data: {
        name: "register",
        description: "Register your FFXIV character with bunbot",
        options: [
            {
                name: "server",
                type: "STRING",
                description: "The server you play on",
                required: true,
            },
            {
                name: "charactername",
                type: "STRING",
                description: "The character you play as",
                required: true,
            }
        ],
    }
};
