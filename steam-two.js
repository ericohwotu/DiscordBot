'use strict';
var request = require("request");
var completed = false;
//use steam to get all the games

function getGames(str) {
    let gamesJSON = [];


    let requestURL = "http://api.steampowered.com/ISteamApps/GetAppList/v0002";

    let r = request(requestURL, function (err, res, body) {
        search(str, JSON.parse(body).applist.apps);
        completed = true;

    });
    console.log("haha")
}

function getGameDetails(id) {
    let gameResult = [];

    let requestURL = "http://store.steampowered.com/api/appdetails?appids=" + id;

    let r = request(requestURL, function (err, res, body) {
        let result = JSON.parse(body)
        console.log(result.data.name + " !!!d: " + result.data.description);
    });

    return gameResult
}

function search(str, json) {
    let results = json.filter(function (obj) {
        return obj.name.toUpperCase().includes(str.toUpperCase());
    });
    //console.log(result)
    results.sort(function(a,b){
        return a.name.length - b.name.length;
    })

    getGameDetails(results[0].appid);
}

getGames("Modern Warfare 2")
module.exports = {
    run : getGames
};



