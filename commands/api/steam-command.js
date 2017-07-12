const { Command } = require('discord.js-commando');
const steamScript = require('../../steam.js');

module.exports = class SteamCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'steam',
            group: 'api',
            memberName: 'steam',
            description: 'runs the square in based on the words',
            examples: ['steam', 'hover'],
            args: [
                {
                    key: 'action',
                    prompt: 'what do you want to do?',
                    validate: cmdValidate,
                    type: 'string'
                },
                {
                    key: 'search',
                    prompt: 'input the game?',
                    type: 'string'
                }
            ]
        });
    }
    run(msg, args) {
        // return msg.say(msg.content);
        const { action, search } = args;
        console.log(search)

        return steamScript.run(action.toUpperCase(), search, msg);
    }


}

//ensure command is part of the approved commands
function cmdValidate(value, msg, args) {
    return value == "search" || value == "details"
}