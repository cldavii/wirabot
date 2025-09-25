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
        const user = interaction.options.getUser('apelido');
        const userAllData = await user.fetch();
        const member = await interaction.guild.members.fetch(userAllData.id);
        const roles = member.roles.cache.map(role => role).join(` \n `);
        const avatar = userAllData.displayAvatarURL({
            dynamic: true,
            size: 512,
        });
        const banner = userAllData.bannerURL({
            dynamic: true,
            size: 1024,
        });
        const joinedAt = `<t:${parseInt(member.joinedAt / 1000)}:R>`;
        const createdAt = `<t:${parseInt(user.createdAt / 1000)}:R>`;

        const embed = new EmbedBuilder()
            .setTitle(`${userAllData.username}`)
            .setDescription(`Detalhes sobre ${userAllData.tag}`)
            .setColor('Random')
            .setThumbnail(avatar)
            .setImage(banner)
            .setFooter({ text: `ID: ${userAllData.id}` })
            .setTimestamp()
            .addFields(
                {
                    name: 'Entrou no servidor',
                    value: `${joinedAt}`,
                    inline: true
                },
                {
                    name: 'Data da conta',
                    value: `${createdAt}`,
                    inline: true
                },
                {
                    name: 'Cargos',
                    value: `${roles}`,
                    inline: true
                },
            );
        await interaction.reply({
            embeds: [embed],
            flags: MessageFlags.Ephemeral
        });
    }
}