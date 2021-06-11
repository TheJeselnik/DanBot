module.exports = {
    name: 'dice',
    aliases: ['roll'],
    description: 'Rolls sided dice',
    usage: '<dice sides> (<number of die>)',
    args: true,
    execute(message, args) 
    {
        if (!args.length)
        {
            return;
        }

    }
}