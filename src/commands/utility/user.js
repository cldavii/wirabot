const { SlashCommandBuilder, EmbedBuilder, MessageFlags, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Exibe informações sobre um membro do servidor')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)
        .addUserOption(option => option
            .setName('apelido')
            .setDescription('Informe o apelido do membro que deseja saber os detalhes')
            .setRequired(true)
        ),
    async execute(interaction) {
        const selectedUser = interaction.options.getUser('apelido');
        const userAllData = await selectedUser.fetch();
        const member = await interaction.guild.members.fetch(userAllData.id);
        const roles = member.roles.cache.map(role => role).join(`\n`);
        const avatar = userAllData.displayAvatarURL({
            dynamic: true,
            size: 512,
        });
        const banner = userAllData.bannerURL({
            dynamic: true,
            size: 1024,
        });
        const joinedAt = `<t:${parseInt(member.joinedAt / 1000)}:R>`;
        const createdAt = `<t:${parseInt(userAllData.createdAt / 1000)}:R>`;
        const flags = userAllData.flags.toArray().join(' \n ');

        const embed = new EmbedBuilder()
            .setTitle(`${userAllData.globalName || userAllData.username}`)
            .setDescription(`Detalhes sobre ${userAllData.tag}`)
            .setColor(userAllData.accentColor || 'Random')
            .setThumbnail(avatar)
            .setFooter({ text: `ID: ${userAllData.id}` })
            .setTimestamp()
            .addFields(
                {
                    name: 'Nome de Usuário',
                    value: `\`\`\`${userAllData.username}\`\`\``,
                    inline: false
                },
                {
                    name: 'Nome Personalizado',
                    value: `\`\`\`${userAllData.globalName || 'Nenhum'}\`\`\``,
                    inline: false
                })
            .addFields(
                {
                    name: 'Entrou no Servidor',
                    value: `${joinedAt}`,
                    inline: true
                },
                {
                    name: 'Data da Conta',
                    value: `${createdAt}`,
                    inline: true
                },
                {
                    name: 'É um Bot?',
                    value: `${userAllData.bot ? 'Sim' : 'Não'}`,
                    inline: false
                })
            .addFields(
                {
                    name: 'Cargos',
                    value: roles.length > 0 ? roles : 'Nenhum',
                    inline: false
                },
                {
                    name: 'Selo de Perfil',
                    value: `${flags || 'Nenhum'}`,
                    inline: false
                }
            );
        if (banner) {
            embed.setImage(banner);
        }
        await interaction.reply({
            embeds: [embed],
            flags: MessageFlags.Ephemeral
        });
    }
}