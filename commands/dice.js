module.exports = {
    name: 'dice',
    aliases: ['roll'],
    description: 'Rolls sided dice',
    usage: '<dice sides [1-1000]> (<number of die>[1-100])',
    args: true,
    execute(message, args) 
    {
        if (!args.length > 0)
        {
            return;
        }
        
        var sides = parseInt(args.shift());
        var count = 1;
        var diceRolls = [];

        if (args.length > 0)
        {
            count = parseInt(args.shift());
        }

        if (!Number.isInteger(sides) || !Number.isInteger(count))
        {
            return this.printErrorForNonInteger(message);
        }

        if (sides > 1000)
        {
            sides = 1000;
        }
        if (count > 100)
        {
            count = 100;
        }

        if (sides < 1)
        {
            sides = 1;
        }
        if (count < 1)
        {
            count = 1;
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

    printErrorForNonInteger(message)
    {
        return message.channel.send('Dice sides and count must be an integer');
    }
}