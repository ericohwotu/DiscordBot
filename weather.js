

const secrets = require("./token");
const request = require("request");

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

    console.log(res[0].id);
}

function getTemp(id){
    let dailyUrl = "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/" + id + "?key=" + secrets.metkey;
}

getSiteList("london");