const fs = require("fs");

module.exports = async function (fileName, contents) {
    fs.writeFile("./config/" + fileName + ".json", JSON.stringify(contents), () => {});
};
