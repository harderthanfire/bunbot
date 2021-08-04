const Discord = require("discord.js");
const client = new Discord.Client({
	intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

let commandLoopup = require("./utils/loadCommands.js")();
const config = require("./utils/loadConfigFile.js")("config");

client.on("ready", () => {
	console.log("Logged in as " + client.user.tag + "!");
	require("./utils/loadCommandSetup.js")(client, config);
});

client.on("interactionCreate", (interaction) => {
	if (!interaction.isCommand()) return;
	const commandName = interaction.commandName;

	if (commandLoopup[commandName]) {
		commandLoopup[commandName](client, interaction, config);
	}

	if (commandName == "reloadcommands" && require("./utils/isAdmin.js")(client, interaction, config)) {
		require("./utils/loadCommandSetup.js")(client, config);
		commandLoopup = require("./utils/loadCommands.js")();
		require("./utils/sendTextReply.js")(client, interaction, "commands have been reloaded!");
	}
});

client.login(config.clientId);
