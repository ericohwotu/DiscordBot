const { Command } = require('discord.js-commando');
const squareScript = require('./fizzbuzz.js')

module.exports = class SquareCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'fizzbuzz',
            group: 'projects',
            memberName: 'fizzbuzz',
            description: 'Runs the fizzbuzz command',
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
    run(msg, args) {
        // return msg.say(msg.content);

        let { limit } = args
        return msg.reply(squareScript._run(limit));

    }
}