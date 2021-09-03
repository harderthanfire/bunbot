const Discord = require("discord.js");
const client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

const config = require("./utils/loadConfigFile.js")("config");

client.on("ready", () => {
    console.log("Logged in as " + client.user.tag + "!");
    config.commandLookup = require("./utils/loadCommands.js")(client, config);
});

client.on("interactionCreate", (interaction) => {
    if (!interaction.isCommand()) return;
    const commandName = interaction.commandName;

    if (config.commandLookup[commandName]) {
        config.commandLookup[commandName](client, interaction, config);
    }
});

client.login(config.clientId);
