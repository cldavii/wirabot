function loadEvents(client) {
    const fs = require('node:fs');
    const path = require('node:path');
    const ascii = require('ascii-table');
    const table = new ascii().setHeading('Eventos', 'Status');

    const eventsFolderPath = path.join(__dirname, '..', 'events');
    const eventsFile = fs.readdirSync(eventsFolderPath).filter(file => file.endsWith('.js'));
    for (const file of eventsFile) {
        const filePath = path.join(eventsFolderPath, file);
        const event = require(filePath)
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
            table.addRow(file, 'pronto');
        } else {
            client.on(event.name, (...args) => event.execute(...args));
            table.addRow(file, 'pronto');
        }
    }
    console.log(table.toString());
    console.log('Eventos carregados');
}

module.exports = { loadEvents };