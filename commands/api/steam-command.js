const { Command } = require("discord.js-commando");
const steamScript = require("./steam.js");

//ensure command is part of the approved commands
function cmdValidate(value, msg, args) {
    return value == "search" || value == "details";
}

module.exports = class SteamCommand extends Command {
    constructor(client) {
        super(client, {
            name: "steam",
            group: "api",
            memberName: "steam",
            description: "Interacts with the steam api to get appslist",
            examples: ["steam search grand theft auto", "steam details grand theft auto v"],
            args: [
                {
                    key: "action",
                    prompt: "what do you want to do?",
                    validate: cmdValidate,
                    type: "string"
                },
                {
                    key: "search",
                    prompt: "input the game?",
                    type: "string"
                }
            ]
        });
    }
    run(msg, args) {
        // return msg.say(msg.content);
        const { action, search } = args;
        const callback = {limit: 1900, callback: steamScript.run, prompt: (a)=>msg.channel.send(a), reply: (a)=>msg.reply(a), collector: (a) => {return msg.channel.createMessageCollector(a)}};
        return steamScript.run(action.toUpperCase(), search, callback);
    }


}

