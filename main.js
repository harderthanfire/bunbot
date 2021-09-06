const Discord = require("discord.js");
const { Player, EVENTS } = require("discord.js-player");
const { EVT_TRACK_START, EVT_TRACK_ADD } = EVENTS;
const client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

const config = require("./utils/loadConfigFile.js")("config");
let lastPlayed = "";
client.music = new Player(config.spotifyId, config.spotifySecret, { canUseCache: true });
client.music.connect();

client.music.on(EVT_TRACK_START, (channel, track) => {
    if (lastPlayed != track.title) {
        channel.send(`Track ${track.title} started playing!`);
        lastPlayed = track.title;
    }
});

client.music.on(EVT_TRACK_ADD, (channel, tracks) => {
    let titles = "";
    for(const track of tracks) {
        titles = titles + "\n" + track.title;
    }
    channel.send(`Added: ${titles} \n[${tracks.length} track(s)] to the queue!`);
});

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
