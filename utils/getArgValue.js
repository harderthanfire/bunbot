module.exports = function (args, name) {
    return args.get(name, false).value;
};
