const { Command } = require("discord.js-commando");
const garageSim = require("./garage.js")

module.exports = class GarageCommand extends Command {
    constructor(client) {
        super(client, {
            name: "garage",
            group: "projects",
            memberName: "garage",
            description: "Runs the garage project",
            examples: ["garage open","garage output garage","garage create PEUGEUT SCYE34 9 NOFAULTS"],
            args:[
                {
                    key: "cmds",
                    prompt: "please input the commands",
                    type: "string"
                }
            ]
        });
    }
    run(msg, args) {
        const {cmds} = args;

        return msg.reply(garageSim._run(cmds));
    }
}