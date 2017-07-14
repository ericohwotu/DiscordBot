const { Command } = require("discord.js-commando");
const weatherScript = require("./weather.js");

module.exports = class SteamCommand extends Command {
    constructor(client) {
        super(client, {
            name: "weather",
            group: "api",
            memberName: "weather",
            description: "Queries the weather based on the given location grom the Met Office",
            examples: ["weather london"],
            args:[
                {
                    key: "location",
                    prompt: "for what location?",
                    type: "string"
                }
            ]
        });
    }
    run(msg, args) {
        const {location} = args;
        const callback = {limit: 1900, callback: weatherScript.helper, prompt: (a)=>msg.channel.send(a), reply: (a)=>msg.reply(a), collector: (a) => {return msg.channel.createMessageCollector(a)}};
        return weatherScript.run(location, callback);
    }
}