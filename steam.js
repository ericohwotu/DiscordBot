'use strict';
var request = require("request");

//use steam to get all the games

function getGames(str, msg) {
    let gamesJSON = [];

    let requestURL = "http://api.steampowered.com/ISteamApps/GetAppList/v0002";

    let r = request(requestURL, function (err, res, body) {
        search(str, JSON.parse(body).applist.apps, msg);
    });
}

function search(str, json, msg) {

    let results = json.filter(function (obj) {
        return obj.name.toUpperCase().includes(str.toUpperCase());
    });
    
    //sort by name length to better match 
    results.sort(function(a,b){
        return a.name.length - b.name.length;
    })

    if(results[0]){
        getGameDetails(results[0].appid, msg);
    }else{
        msg.reply("Sorry game not found.")
    }
}

function getGameDetails(id, msg) {
    let gameResult = [];

    let requestURL = "http://store.steampowered.com/api/appdetails?appids=" + id;

    let r = request(requestURL, function (err, res, body) {
        let result = JSON.parse(body)[id].data;
        let regex = /<br\s*[\/]?>/gi
        

        msg.reply("\nName: " + result.name + " \nDescription: " + result.short_description.replace(regex,"\r\n") + " \nRelease Date: " +result.release_date.date + "\nMinimum Age: " + result.required_age);
        console.log(result.name + " \n!!!d: " + result.short_description.replace(regex,"\r\n") + " \nrd: " +result.release_date.date + "\nra: " + result.required_age);
    });

    return gameResult;
}



module.exports = {
    run : getGames
};



