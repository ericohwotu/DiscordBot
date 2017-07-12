const secrets = require("./token");
const request = require("request");
const vals = require("./weather-data")


const sitelistUrl = "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=" + secrets.metkey
//const dailyUrl = "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=" + secrets.metkey

function getSiteList(str, msg) {
    const res = request(sitelistUrl, function (err, res, body) {
        def(JSON.parse(body).Locations.Location, str, msg);
    })
}

function def(json, str, msg) {


    let res = json.filter(function (obj) {
        if (obj.name) {
            return obj.name.toUpperCase().includes(str.toUpperCase());
        } else if (obj.unitaryAuthArea) {
            return obj.unitaryAuthArea.toUpperCase().split(" ").includes(str.toUpperCase());
        } else {
            return false;
        }
    });

    //TODO: implement selection algorythm
    if (res[0]) {
        getTemp(res[0].id, msg);
    }else{
        msg.reply("Sorry the location wasnt found")
    }
}

function getTemp(id, msg) {
    let dailyUrl = "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/" + id + "?res=daily&key=" + secrets.metkey;
    const res = request(dailyUrl, function (err, res, body) {
        let result = JSON.parse(body).SiteRep.DV.Location.Period[0].Rep[0];
        let solution = "";
        solution += "\nWeather: " + vals._weather.members[result.W];
        solution += "\nVisibility: " + vals._visibility.members[result.V];
        msg.reply(solution);
        console.log(solution);
    })
}

module.exports = {
    run: getSiteList
}