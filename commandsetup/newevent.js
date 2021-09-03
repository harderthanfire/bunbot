module.exports = {
    data: {
        name: "newevent",
        description: "Create a new event",
        options: [
            {
                name: "title",
                type: "STRING",
                description: "The title of the event",
                required: true,
            },
            {
                name: "date",
                type: "STRING",
                description: "Date when the event will happen - server time",
                required: true,
            },
            {
                name: "time",
                type: "STRING",
                description: "Time when the event will happen - server time",
                required: true,
            },
            {
                name: "description",
                type: "STRING",
                description: "Description of the event",
                required: true,
            },
            {
                name: "emoji",
                type: "STRING",
                description: "Emoji used to confirm signup to the event",
                required: true,
            },
        ],
    }
};
