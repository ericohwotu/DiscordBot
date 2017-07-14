const {CommandoClient} = require('discord.js-commando');
const path = require('path');
const private = require('./token.js');
const Discord = require('discord.js');
const token = private.discordkey;


const client = new CommandoClient({
    commandPrefix: '!bot',
    disableEveryone: true
});

client.registry
    .registerGroups([
        ['group1', 'Our First Command Group'],
        ['projects', 'Group for all my projects'],
        ['api', 'Deals with all api integration']
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    //client.user.setGame('Game');
});

client.login(token);