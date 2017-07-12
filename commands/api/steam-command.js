const { Command } = require('discord.js-commando');
const steamScript = require('../../steam.js');

module.exports = class SteamCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'steam',
            group: 'projects',
            memberName: 'steam',
            description: 'runs the square in based on the words',
            examples: ['steam']
        });
    }
    run(msg) {
        // return msg.say(msg.content);
        let commands = msg.content.replace('!bot steam ', '').trim()
        return steamScript.run(commands, msg);

    }
}