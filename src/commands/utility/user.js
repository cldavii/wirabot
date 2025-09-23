const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('user').setDescription('Exibe informações sobre um membro do servidor'),
    async execute(interaction) {
        await interaction.reply(`Esse comando foi executado por ${interaction.user.username} que entrou neste servidor em ${interaction.member.joinedAt}`,);
    }
}