const { Command } = require('discord.js-commando');
const squareScript = require('../../square.js')

module.exports = class SquareCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'square',
            group: 'projects',
            memberName: 'square',
            description: 'runs the square in based on the words',
            examples: ['square']
        });
    }
    run(msg) {
        // return msg.say(msg.content);
        let commands = msg.content.replace('!bot square', '').trim().split(" ")

        if (commands.length >= 3) {
            return msg.reply(squareScript._run(commands[0], commands[1], commands[2]));
        } else {
            return msg.reply(commands + " Sorry you have not fed all the desire fields\n Right format: !bot square string <no> <no>");
        }
    }
}