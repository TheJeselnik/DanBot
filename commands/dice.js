module.exports = {
    name: 'dice',
    aliases: ['roll'],
    description: 'Rolls sided dice',
    usage: '<dice sides> (<number of die>)',
    args: true,
    execute(message, args) 
    {
        if (!args.length > 0)
        {
            return;
        }
        
        var sides = args.shift();
        var count = 1
        var diceRolls = [];

        if (args.length > 0)
        {
            count = args.shift();
        }

        for (i = 0; i < count; i++)
        {
            diceRolls.push(Math.floor(Math.random() * sides) + 1);
        }

        this.printDiceRoll(diceRolls, sides, count, message);
    },

    printDiceRoll(diceRolls, sides, count, message)
    {
        var textLines = [];

        textLines.push(`Rolling ${sides}-sided dice x${count}`);
        textLines.push('```');
        textLines.push(`${diceRolls}`);
        textLines.push('```');
        
        return message.channel.send(textLines, { split: true });
    },
}