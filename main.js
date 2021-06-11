const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');

const commandPrefix = config.prefix;
const client = new Discord.Client();

var readyForCommands = true;

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on("message", async message =>
{
    // TODO find good bool solution to condense these if's

    // TODO potentially queue the commands?
    if (!readyForCommands)
    {
        return;
    }

    if (message.author.bot) 
    {
        return;
    }

    const messageText = message.content;
    if (!messageText.startsWith(commandPrefix))
    {
        return;
    }

    const messageArgs = message.content.slice(commandPrefix.length).trim().split(/ +/);
	const commandName = messageArgs.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases.includes(commandName));
    const helpCommand = client.commands.get('commands');

    if(!command) 
    {
        return helpCommand.printHelp(message);
    }

    if (command.args && !messageArgs.length)
    {
        const commandArgs = [ commandName ];
        return helpCommand.printCommandHelp(message, commandArgs);
    }

    readyForCommands = false;
    //message.channel.send('not ready');

    try {
        command.execute(message, messageArgs);
    } catch (error) {
        console.error(error);
        message.reply('Unable to process command');
    }

    readyForCommands = true;
    //message.channel.send('ready');
});

client.login(config.token);