const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`O Aplicativo ${client.user.username} está pronto para uso`);
    }
}