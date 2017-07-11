var request = require("request");


//var requestURL = "http://store.steampowered.com/api/appdetails?appids=12210";
var requestURL = "http://api.steampowered.com/ISteamApps/GetAppList/v0001"

var r = request(requestURL, function(err, res, body) {
     console.log(JSON.parse(body).applist.apps.app);
});

