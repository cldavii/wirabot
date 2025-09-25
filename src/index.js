const { Client, GatewayIntentBits, Collection, ActivityType } = require('discord.js');
const bot_token = require('../config.json').bot_token;

const { loadEvents } = require('./handlers/eventsHandler');
const { loadCommands } = require('./handlers/commandsHandler');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();
client.cooldowns = new Collection();

client.login(bot_token).then(() => {
    loadEvents(client);
    loadCommands(client);
});