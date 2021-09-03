module.exports = {
    data: {
        name: "editevent",
        description: "Edit an existing event",
        options: [
            {
                name: "id",
                type: "STRING",
                description: "The messageid of the event",
                required: true,
            },
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
