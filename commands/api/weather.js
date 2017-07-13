const secrets = require("../../token");
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
            if(promptString.length>1900){
                for(let x = 0; x < promptString.length; x += 1900){
                    msg.channel.send(promptString.substring(x,x+1900));
                }
            }else{
                msg.channel.send(promptString);
            }

            const collector = msg.channel.createCollector((m) => m.author.bot === false, {
                time: 30000,
            });

            collector.on("collect",function(m){i=m; console.log("haha" + m);collector.stop()})

            collector.on("end", (collected, reason) => { 
                   getTemp(res[i].id, res[i].name, msg);
            });
        }else{
            getTemp(res[i].id, res[i].name, msg);
        }

        
    } else {
        msg.reply("Sorry the location wasnt found")
    }
}

function getTemp(id, name, msg) {
    let dailyUrl = "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/" + id + "?res=3hourly&key=" + secrets.metkey;
    
    const res = request(dailyUrl, function (err, res, body) {
        let result = JSON.parse(body).SiteRep.DV.Location.Period[0].Rep[0];
        console.log(result)
        let solution = "Name: " + name;
        solution += "\nWeather: " + vals._weather.members[result.W];
        solution += "\nTemperature: " + result.T + "C";
        solution += "\nFeels Like: " + result.F + "C";
        solution += "\nChance of Rain: " + result.Pp + "%";
        solution += "\nVisibility: " + vals._visibility.members[result.V];
        msg.reply(solution);
        console.log(solution);
    })
}

module.exports = {
    run: getSiteList
}