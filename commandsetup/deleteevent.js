module.exports = {
    data: {
        name: "deleteevent",
        description: "Delete an event",
        options: [
            {
                name: "id",
                type: "STRING",
                description: "The id of the event",
                required: true,
            },
        ],
    }
};
