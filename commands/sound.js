const config = require('../config.json');
const sounds = require('../sound.json');

module.exports = {
    name: 'sound',
    aliases: ['play'],
    description: 'Plays specific audio clips for channel you are in',
    usage: '<audio name>',
    args: true,
    execute(message, args) 
    {
        if (!args.length)
        {
            return;
        }
        // TODO massive rework of bot needed for this command
        //this.playSound(message, args);
    },

    playSound(message, args)
    {
        const { voice } = message.member;

        //if (!voice.chann)

        var requestedSound = args[0].toLowerCase();
        if (!requestedSound in sounds)
        {
            message.channel.send(`Sorry, that sound wasn't found. Please consult ...`);
            return;
        }
        
        if (message.member.voice.channel)
        {
            const voiceChannel = message.member.voice.channel;
            const connection = voiceChannel.join();
            const dispatcher = connection.play(requestedSound);
    
            dispatcher.on('start', () => 
            {
                message.channel.send(`${requestedSound} is now playing!`);
            });
    
            dispatcher.on('finish', () =>
            {
                message.channel.send(`${requestedSound} has finished playing!`);
            });
    
            dispatcher.on('error', console.error);
            
            connection.disconnect();
        }
    }
}