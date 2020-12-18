const { prefix } = require('../config.json');

module.exports = {
    name: 'commands',
    aliases: ['help', 'options'],
    description: 'Displays available commands',
    args: false,
    execute(message, args) 
    {
        if (!args.length) 
        {
            this.printHelp(message);
            return;
        }

        this.printCommandHelp(message, args);
    },
    
    printHelp(message)
    {
        const { commands } = message.client;
        const textLines = [];

        textLines.push('**Dan Bot Commands:**');
        textLines.push(commands.map(command => command.name).join(', '));
        textLines.push(`Using \`${prefix} help [command name]\` will show details on a command.`);
        return message.channel.send(textLines, { split: true });
    },

    printCommandHelp(message, commandName)
    {
        const { commands } = message.client;
        const textLines = [];

        commandName = commandName.toLowerCase();
        const command = commands.get(commandName) || commands.find(c => c.aliases.includes(commandName));

        if (!command)
        {
            this.printHelp(message);
        }

        textLines.push(`**Name:** ${command.name}  `);
        if (command.aliases) textLines.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) textLines.push(`**Description:** ${command.description}`);
        if (command.usage) textLines.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
        return message.channel.send(textLines, { split: true });
    },
};