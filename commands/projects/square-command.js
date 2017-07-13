const { Command } = require('discord.js-commando');
const squareScript = require('./square.js')

module.exports = class SquareCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'square',
            group: 'projects',
            memberName: 'square',
            description: 'runs the square in based on the words',
            examples: ['square'],
            args: [
                {

                    key: 'word',
                    prompt: 'what word do you want to square?',
                    type: 'string'
                },
                {
                    key: 'width',
                    prompt: 'what width would you like (1-6)?',
                    type: 'integer',
                    max: 6,
                    min: 1
                },
                {
                    key: 'height',
                    prompt: 'what height would you like (1-12)?',
                    type: 'integer',
                    max: 12,
                    min: 1
                }
            ]
        });
    }
    run(msg, args) {
        let {word, width, height} = args
        return msg.reply(squareScript._run(word, height, width));
    }
}