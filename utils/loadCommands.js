const fs = require("fs");

module.exports = function () {
    const commandLookup = {};
    fs.readdirSync("./commands/").forEach((file) => {
        const fileNoBs = file.replace(".js", "");
        delete require.cache[require.resolve("../commands/" + file)];
        commandLookup[fileNoBs] = require("../commands/" + file);
    });

    return commandLookup;
};
