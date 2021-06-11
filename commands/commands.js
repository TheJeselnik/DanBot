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
            return this.printHelp(message);
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

    printCommandHelp(message, commandNameArgs)
    {
        const { commands } = message.client;
        const textLines = [];

        const commandName = commandNameArgs[0].toLowerCase();
        const command = commands.get(commandName) || commands.find(c => c.aliases.includes(commandName));

        if (!command)
        {
            return this.printHelp(message);
        }

        textLines.push(`Displaying Command Help for ${commandName}`);
        textLines.push('```');
        textLines.push(`**Name:** ${command.name}`);
        if (command.aliases) textLines.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) textLines.push(`**Description:** ${command.description}`);
        if (command.usage) textLines.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
        textLines.push('```');
        return message.channel.send(textLines, { split: true });
    },
};