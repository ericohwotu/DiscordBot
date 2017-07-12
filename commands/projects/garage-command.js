const { Command } = require('discord.js-commando');
const garageSim = require('../../garage.js')

module.exports = class GarageCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'garage',
            group: 'projects',
            memberName: 'garage',
            description: 'runs the garage.',
            examples: ['garage']
        });
    }
    run(msg) {
        return msg.reply(garageSim._run(msg.content.replace('!bot garage ','')));
    }
}