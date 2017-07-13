const { Command } = require('discord.js-commando');
const threesScript = require('./threes.js')

module.exports = class SquareCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'threes',
            group: 'projects',
            memberName: 'threes',
            description: 'Runs the threes command',
            examples: ['threes 1000'],
            args: [
                {
                    key: 'number',
                    prompt: 'what is the initial number?',
                    type: 'integer',
                    max: 999999999,
                    min: 2
                }
            ]
        });
    }
    run(msg, args) {

        let { number } = args
        return msg.reply(threesScript._run(number));

    }
}