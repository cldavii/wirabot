const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        client.user.setActivity({
            type: ActivityType.Custom,
            name: 'observando silenciosamente'
        });
        console.log(`O Aplicativo ${client.user.username} está pronto para uso`);
    }
}