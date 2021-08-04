const fs = require("fs");

module.exports = function (client, config) {
    fs.readdirSync("./commandsetup/").forEach((file) => {
        delete require.cache[require.resolve("../commandsetup/" + file)];
        require("../commandsetup/" + file)(client, config);
    });
};
