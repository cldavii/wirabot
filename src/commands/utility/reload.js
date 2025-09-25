const { SlashCommandBuilder, PermissionFlagsBits, StringSelectMenuBuilder, ActionRowBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Recarrega um comando específico do bot')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .addStringOption(option => option
            .setName('comando')
            .setDescription('Selecione o comando para recarregar')
            .setAutocomplete(true)
            .setRequired(true)
        ),
    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
        const choices = interaction.client.commands.map(command => command.data.name);
        const filtered = choices.filter(choice => choice.startsWith(focusedValue));
        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );
    },
    async execute(interaction) {
        const commandName = interaction.options.getString('comando').toLowerCase();
        const command = interaction.client.commands.get(commandName);
        if (!command) {
            return interaction.reply({
                content: `Não há nenhum comando nomeado ${commandName}`,
                flags: MessageFlags.Ephemeral
            });
        }
        delete require.cache[require.resolve(`./${command.data.name}.js`)];
        try {
            const newCommand = require(`./${command.data.name}.js`);
            interaction.client.commands.set(newCommand.data.name, newCommand);
            await interaction.reply({
                content: `O comando \`${newCommand.data.name}\` foi recarregado`,
                flags: MessageFlags.Ephemeral
            });
        } catch (error) {
            console.error(error.message);
        }
    }
}