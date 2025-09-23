const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) {
            return console.error(`Nenhum comando nomeado ${interaction.commandName} foi encontrado.`);
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: 'Houve um erro ao eecutar este comando',
                    flags: MessageFlags.Ephemeral
                });
            } else {
                await interaction.reply({
                    content: 'Houve um erro ao executar este comando',
                    flags: MessageFlags.Ephemeral
                });
            }
        }
    }
}