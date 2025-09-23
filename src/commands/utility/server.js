const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('server').setDescription('Exibe as informações sobre este servidor'),
    async execute(interaction) {
        await interaction.reply(`O nome deste servidor é ${interaction.guild.name} e ele possui ${interaction.guild.memberCount} membros`);
    }
}