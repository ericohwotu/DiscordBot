'use strict';
const request = require("request");

//use steam to get all the games

function getGames(cmd, str, callbackObj) {
    let gamesJSON = [];

    let requestURL = "http://api.steampowered.com/ISteamApps/GetAppList/v0002";

    let r = request(requestURL, function (err, res, body) {
        search(cmd, str, JSON.parse(body).applist.apps, callbackObj);
    });
}

function search(cmd, str, json, callbackObj) {

    let results = json.filter(function (obj) {
        return obj.name.toUpperCase().includes(str.toUpperCase());
    });

    //sort by name length to better match 
    results.sort(function (a, b) {
        return a.name.length - b.name.length;
    })

    if (results[0]) {
        if (cmd.includes("SEARCH")) {

            let replyString = "";

            results.forEach(function (obj) {
                replyString += "\n" + obj.name;
            });

            if(replyString.length>callbackObj.limit){
                replyString = replyString.slice(0,1900) + "\n..."
            }
            
            callbackObj.reply(replyString);

        } else {
            getGameDetails(results[0].appid, callbackObj.reply);
        }
    } else {
        callbackObj.reply("Sorry game not found.");
    }
}

function getGameDetails(id, callback) {
    let gameResult = [];

    let requestURL = "http://store.steampowered.com/api/appdetails?appids=" + id;

    let r = request(requestURL, function (err, res, body) {
        let result = JSON.parse(body)[id].data;
        let regex = /<br\s*[\/]?>/gi
        if (result) {
            callback("\nName: " + result.name + " \nDescription: " + result.short_description.replace(regex, "\r\n") + " \nRelease Date: " + result.release_date.date + "\nMinimum Age: " + result.required_age);
        } else {
            callback("sorry apparently the details cannot be found");
        }
    });

    return gameResult;
}



module.exports = {
    run: getGames,
    test: getGameDetails
};



