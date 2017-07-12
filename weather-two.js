

const secrets = require("./token");
const request = require("request");
const vals = require("./weather-data")


const sitelistUrl = "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=" + secrets.metkey
//const dailyUrl = "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=" + secrets.metkey

function getSiteList(str) {
    const res = request(sitelistUrl, function (err, res, body) {
        def(JSON.parse(body).Locations.Location, str);
    })
}

function def(json, str) {

    let res = json.filter(function (obj) {
        if (obj.name) {
            return obj.name.toUpperCase().split(" ").includes(str.toUpperCase());
        }else if (obj.unitaryAuthArea) {
            return obj.unitaryAuthArea.toUpperCase().split(" ").includes(str.toUpperCase());
        } else {
            return false;
        }
    });

    //TODO: implement selection algorythm
    getTemp(res[0].id);
}

function getTemp(id){
    let dailyUrl = "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/" + id + "?res=daily&key=" + secrets.metkey;
     const res = request(dailyUrl, function (err, res, body) {
        let result = JSON.parse(body).SiteRep.DV.Location.Period[0].Rep[0]
        console.log(result) 
        console.log("weather: " + vals._weather.members[result.W] )
        console.log("Visibility: " + vals._visibility.members[result.V]);
    })
}



getSiteList("chelsea");