function loadCommands(client) {
    const fs = require('node:fs');
    const path = require('node:path');
    const ascii = require('ascii-table');
    const table = new ascii().setHeading('Comandos', 'Status');
    // const commandsFolderPath = path.join(__dirname, '..', 'commands'); Outra forma
    const commandsFolderPath = path.join('/home', 'cldavi', 'Projetos', 'wirabot', 'src', 'commands');
    const commandsFolder = fs.readdirSync(commandsFolderPath);
    for (const folder of commandsFolder) {
        const commandsPath = path.join(commandsFolderPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
                table.addRow(file, 'pronto');
            } else {
                console.log(`O comando presente em ${filePath} está faltando a propriedade "data" ou "execute"`);
            }
        }
    }
    console.log(table.toString());
    console.log('Comandos carregados');
}

module.exports = { loadCommands };