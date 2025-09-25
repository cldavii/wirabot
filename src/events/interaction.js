const { Events, Collection, MessageFlags } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        // Verificando se o que foi digitado é um slash command
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            // Verificando se no comando tem cooldown
            const { cooldowns } = interaction.client;
            if (!interaction.client.cooldowns.has(command.data.name)) {
                interaction.client.cooldowns.set(command.data.name, new Collection());
            }
            // Configurando o cooldown
            const now = Date.now();
            const timestamps = cooldowns.get(command.data.name);
            const defaultCooldownDuration = 5;
            const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;
            if (timestamps.has(interaction.user.id)) {
                const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
                if (now < expirationTime) {
                    const expiredTimestamp = Math.round(expirationTime / 1000);
                    return interaction.reply({
                        content: `Espere <t:${expiredTimestamp}:R> antes de usar o comando \`${command.data.name}\` novamente.`,
                        flags: MessageFlags.Ephemeral
                    });
                }
            }
            timestamps.set(interaction.user.id, now);
            setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

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
        if (interaction.isAutocomplete()) {
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) return;
            try {
                await command.autocomplete(interaction);
            } catch (error) {
                console.error(error);
            }
        }
    }
}