const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Comando para testar a aplicação. Deve responder com "pong"'),
    async execute(interaction) {
        await interaction.reply('pong');
    }
}