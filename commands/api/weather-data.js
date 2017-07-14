let wTemp = "0 Clear night 1 Sunny day 2 Partly cloudy (night) 3 Partly cloudy (day) 4 Not used 5 Mist 6 Fog 7 Cloudy 8 Overcast 9 Light rain shower (night) 10 Light rain shower (day) 11 Drizzle 12 Light rain 13 Heavy rain shower (night) 14 Heavy rain shower (day) 15 Heavy rain 16 Sleet shower (night) 17 Sleet shower (day) 18 Sleet 19 Hail shower (night) 20 Hail shower (day) 21 Hail 22 Light snow shower (night) 23 Light snow shower (day) 24 Light snow 25 Heavy snow shower (night) 26 Heavy snow shower (day) 27 Heavy snow 28 Thunder shower (night) 29 Thunder shower (day) 30 Thunder".split(/[0-9]+/g);//.split(/[0-9]+/g)
let vTemp = "UN Unknown VP Very poor - Less than 1 km PO Poor - Between 1-4 km MO Moderate - Between 4-10 km GO Good - Between 10-20 km VG Very good - Between 20-40 km EX Excellent - More than 40 km".split(/([A-Z][A-Z])+/g);

//remove blank spaces
vTemp.shift();
wTemp.shift();

//create json objects
let v={"members":{}};
let w={"members":{"NA":"Not Applicable"}};

//get Visibility
for (let i=0; i<vTemp.length; i += 2){
    let key = vTemp[i].toString();
    let val = vTemp[i+1].toString();
    
    v.members[key] = val;
}

//get Weather
for (let i=0; i<wTemp.length; i ++){
    let val = wTemp[i].trim();
    
    w.members[i] = val;
}

module.exports = {
    _visibility: v,
    _weather: w
};