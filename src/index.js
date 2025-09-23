const { Client, GatewayIntentBits, Collection } = require('discord.js');
const bot_token = require('../config.json').bot_token;
const fs = require('node:fs');
const path = require('node:path');

const { loadEvents } = require('./handlers/eventsHandler');
const { loadCommands } = require('./handlers/commandsHandler');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();

client.login(bot_token).then(() => {
    loadEvents(client);
    loadCommands(client);
});