const { Command } = require('discord.js-commando');
const squareScript = require('./square.js')

module.exports = class SquareCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'fizzbuzz',
            group: 'projects',
            memberName: 'fizzbuzz',
            description: 'runs the square in based on the words',
            examples: ['fizzbuzz'],
            args: [
                {
                    key: 'limit',
                    prompt: 'what do you want to go to?',
                    type: 'integer',
                    max: 500,
                    min: 5
                }
            ]
        });
    }
    run(msg,args) {
        // return msg.say(msg.content);
        

        if (commands.length >= 3) {
            return msg.reply(squareScript._run(commands[0], commands[1], commands[2]));
        } else {
            return msg.reply(commands + " Sorry you have not fed all the desire fields\n Right format: !bot square string <no> <no>");
        }
    }
}