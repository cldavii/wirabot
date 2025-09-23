const { REST, Routes } = require('discord.js');
const { bot_token, bot_id, guild_id } = require('../config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];

const commandsFolderPath = path.join(__dirname, 'commands');
const commandsFolder = fs.readdirSync(commandsFolderPath);
for (const folder of commandsFolder) {
    const commandsPath = path.join(commandsFolderPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`O comando presente em ${filePath} está faltando a propriedade "data" ou "execute`);
        }
    }
}

const rest = new REST().setToken(bot_token);
(async () => {
    try {
        const data = await rest.put(
            Routes.applicationGuildCommands(bot_id, guild_id),
            { body: commands }
        );
        if (data.length === 1) {
            console.log(`${data.length} novo comando foi registrado`);
        } else {
            console.log(`${data.length} novos comandos foram registrados`);
        }
    } catch (error) {
        console.error(error);
    }
})();