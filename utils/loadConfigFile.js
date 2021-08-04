const fs = require("fs");

module.exports = function (fileName) {
    const fileExists = fs.existsSync("./config/" + fileName + ".json");
    const loadedFile = fileExists ? fs.readFileSync("./config/" + fileName + ".json") : null;
    let loadedContents = null;
    if (loadedFile) {
        loadedContents = JSON.parse(loadedFile);
    }
    return loadedContents;
};
