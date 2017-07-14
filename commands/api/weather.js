const secrets = require("../../token");
const request = require("request");
const vals = require("./weather-data")


const sitelistUrl = "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=" + secrets.metkey
//const dailyUrl = "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=" + secrets.metkey

function getSiteList(str, callback) {
    const res = request(sitelistUrl, function (err, res, body) {
        def(JSON.parse(body).Locations.Location, str, callback);
    })
}

function def(json, str, callback) {

    let res = json.filter(function (obj) {
        if (obj.name && obj.name.toUpperCase().includes(str.toUpperCase())) {
            obj.tName = obj.name;
            return obj.name.toUpperCase().includes(str.toUpperCase());
        } else if (obj.unitaryAuthArea) {
            obj.tName = obj.unitaryAuthArea;
            return obj.unitaryAuthArea.toUpperCase().split(" ").includes(str.toUpperCase());
        } else {
            return false;
        }
    });
    /// prompt for the location they want

    //TODO: implement selection algorythm
    let i = 0;

    if (res[i]) {
        //get the current array string
        let promptString = ""
        res.forEach(function (e, x) {
            promptString += "\nNo: " + x + " Name: " + e.name;
        });

        promptString += "\n\nPlease input the number of the location you want to view."
        
        if (res.length >= 2) {
            if (promptString.length > callback.limit) {
                for (let x = 0; x < promptString.length; x += callback.limit) {
                    callback.prompt(promptString.substring(x, x + callback.limit));
                }
            } else {
                callback.prompt(promptString);
            }

            const collector = callback.collector((m) => m.author.bot === false, {
                time: 30000,
            });
            
            collector.on("collect", function (m) { i = m; collector.stop() })

            collector.on("end", (collected, reason) => {
                callback.callback(res[i].id, res[i].name, callback.reply);
            });
            
        } else {
            callback.callback(res[i].id, res[i].name, callback.reply);
        }

    } else {
        callback.reply("Sorry the location wasnt found")
    }
}

function getTemp(id, name, callback) {
    let dailyUrl = "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/" + id + "?res=3hourly&key=" + secrets.metkey;

    const res = request(dailyUrl, function (err, res, body) {
        let result = JSON.parse(body).SiteRep.DV.Location.Period[0].Rep[0];
        
        let solution = "Name: " + name;
        solution += "\nWeather: " + vals._weather.members[result.W];
        solution += "\nTemperature: " + result.T + "C";
        solution += "\nFeels Like: " + result.F + "C";
        solution += "\nChance of Rain: " + result.Pp + "%";
        solution += "\nVisibility: " + vals._visibility.members[result.V];
        callback(solution);
        
    })
}


module.exports = {
    run: getSiteList,
    helper: getTemp
}