const { Command } = require('discord.js-commando');
const threesScript = require('./threes.js')
const images = ["http://i.imgur.com/Rhx86bl.jpg", "http://i.imgur.com/aMLFk.jpg", "http://i.imgur.com/4Jmxl58.jpg", "http://i.imgur.com/Y9i11Rx.jpg"]

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

        // var img = images[Math.floor(Math.random() * images.length)];
        // console.log(img);
        // return msg.channel.send({ files: [img] }).then((res)=>{
        return res.reply(threesScript._run(number));
        // })

        //return msg.reply(threesScript._run(number));

    }
}
