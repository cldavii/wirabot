const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Mostra o tempo que o bot leva para responder ao comando'),
    cooldow: 3,
    async execute(interaction) {
        const sent = await interaction.reply({
            content: 'Pingando...',
            withResponse: true,
            flags: MessageFlags.Ephemeral
        });
        interaction.editReply(`**${sent.resource.message.createdTimestamp - interaction.createdTimestamp}**ms `);
    }
}