const {CommandoClient} = require('discord.js-commando');
const path = require('path');
const private = require('./token.js');
const Discord = require('discord.js');
const token = private.key;


const client = new CommandoClient({
    commandPrefix: '!bot',
    disableEveryone: true
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['group1', 'Our First Command Group']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    console.log('Logged in!');
    //client.user.setGame('Game');
});

client.login(token);