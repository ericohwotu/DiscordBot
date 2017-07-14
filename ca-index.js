// console.log("something");
// const garageSim = require('./garage.js');
// const Discord = require('discord.js');
// const private = require('./token.js');

// const token = private.key;
// const client = new Discord.Client();
// const images = ["http://i.imgur.com/Rhx86bl.jpg", "http://i.imgur.com/aMLFk.jpg", "http://i.imgur.com/4Jmxl58.jpg", "http://i.imgur.com/Y9i11Rx.jpg"]


// client.on('ready', () => {
//     console.log('I am ready!');
// });

// client.on('message', message => {
//     if (message.content.includes('ping')) {
//         message.reply('pong');
//     }

//     if (message.content.includes('!bot ')) {
//         var command = message.content.replace('!bot ', '')
//         switch (true) {
//             case command.includes("hw"):
//                 message.reply("Hello World")
//                 break;

//             case command.includes("how are you"):
//                 message.reply("i am fine")
//                 break;

//             case command.includes("can i have"):
//                 if (Math.random() > 0.5) message.reply("yes"); else message.reply("no")
//                 break;

//             case command.includes("get me"):
//                 if (Math.random() > 0.5) message.reply("do i look like your slave!!!!"); else message.reply("GET IT YOURSELF!!!!")
//                 break;

//             case command.includes("output garage"):
//                 message.reply(garageSim._outputGarage());
//                 break;

//             case command.includes("open garage"):
//                 garageSim._garage.open = true
//                 message.reply("The garage is now opened");
//                 break;

//             case command.includes("output pending"):
//                 message.reply(garageSim._output(garageSim._pendingCars));
//                 break;

//             case command.includes("output created"):
//                 message.reply(garageSim._output(garageSim._consolePending));
//                 break;

//             case command.includes("check in"):
//                 var params = command.split(" ");

//                 if(params.length >=3 )
//                     message.reply(garageSim._checkInCar2(params[2]));
//                 else
//                     message.reply(garageSim._checkInCar());

//                 break;

//             case command.includes("create"):
//                 var params = command.split(" ");
//                 if (params.length >= 5) {
//                     let nMake = params[1].toUpperCase();
//                     let nPlate = params[2].toUpperCase();
//                     let nParts = params[3];
//                     let nBroken = true;
//                     if (params[4].toUpperCase()=="NOFAULTS") nBroken = false;
//                     message.reply(garageSim._createCar({make:nMake, license:nPlate, parts: nParts, broken: nBroken}));
//                 }else{
//                     message.reply("sorry the params didn't match up");
//                 }
//                 break;


//             default:
//                 var img = images[Math.floor(Math.random() * images.length)];
//                 console.log(img);
//                 message.reply({ file: img });
//                 break;
//         }
//     }
//     //   if(!message.author.username.includes('aqBot')) 
//     //     message.reply(message.content);
// });

// client.login(token);
