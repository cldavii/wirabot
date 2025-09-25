const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, MessageFlags, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Envia um mensagem personalizada com o botão de verificação')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
    async execute(interaction) {
        const verifyButton = new ButtonBuilder()
            .setCustomId('verifyButton')
            .setLabel('✅')
            .setStyle(ButtonStyle.Success);
        const row = new ActionRowBuilder().addComponents(verifyButton);
        const embed = new EmbedBuilder()
            .setTitle('Verificação de Membro')
            .setColor('Random')
            .setDescription('Seja bem-vindo(a)! Para ter acesso ao servidor, clique no botão abaixo para ser verificado(a)')
            .setThumbnail(interaction.guild.iconURL())
            .setFooter({ text: 'Sistema de Verificação' });
        await interaction.reply({
            embeds: [embed],
            components: [row]
        });
    }
}