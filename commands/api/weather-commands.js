const { Command } = require('discord.js-commando');
const weatherScript = require('../../weather.js');

module.exports = class SteamCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'weather',
            group: 'api',
            memberName: 'weather',
            description: 'queries the weather based on the given location',
            examples: ['weather']
        });
    }
    run(msg) {
        // return msg.say(msg.content);
        let commands = msg.content.replace('!bot weather ', '').trim()
        return weatherScript.run(commands, msg);

    }
}