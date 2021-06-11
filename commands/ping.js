const Emojis = require('../emoji.json');

module.exports = {
    name: 'ping',
    aliases: ['latency'],
    description: 'Gives time it took your message to reach Dan Bot.',
    args: false,
    execute(message, args) 
    {
        var pingTime = Date.now() - message.createdTimestamp;
        message.channel.send(`Latency: ${pingTime}ms.`).then(message => 
            {
                message.react(Emojis.marioPOG);
            });
    }
}