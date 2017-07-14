var carBrands = ["BMW", "Benz", "Toyota", "VW", "Nissan", "Ford"];
var pendingIndex = 0;
var garage = { open: false, vehicles: [], maxcapacity: 30, profit: 0 };
var pendingCars = [];
var consolePending = [];
const MAX_PENDING = 10;

// // ===================================== prototype functions =========================================== //
function nSum(arr, prop) {
    var total = 0;
    for (var i = 0, _len = arr.length; i < _len; i++) {
        total += arr[i][prop];
    }
    return total;
}

function nAverage(arr, prop) {
    var total = 0;
    for (var i = 0, _len = arr.length; i < _len; i++) {
        total += arr[i][prop];
    }
    var average = total / arr.length;
    return average;
}

// // ========================================= onload ==================================================== //

generateCar();
setInterval(generateCar, 2000);

// // ========================================= Garage Functions ========================================= //
var getLicensePlate = function (length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function generateCar() {
    // timeout function that constantly adds an new vehicle
    // to the pending vehicles which are waiting to be accepted
    if (pendingCars.length < MAX_PENDING && garage.open) {
        var ci = Math.floor(Math.random() * carBrands.length);
        var chosenBrand = carBrands[ci];
        var price = (Math.floor(Math.random() * 50000)) + 10000;
        this.vehicle = { _id: pendingIndex, _brand: chosenBrand, _price: price, _license: getLicensePlate(5), _parts: generateParts(10, true) };

        pendingCars.push(this.vehicle);
        //addToPendingTable(this.vehicle)

        pendingIndex++;
    }

}

// function addVehicle() {
//     this.brand = document.getElementById("make").value
//     this.price = document.getElementById("value").value
//     this.license = document.getElementById("licenceplate").value
//     this.vehicle = { _id: pendingIndex, _brand: this.brand, _price: this.price, _license: this.license, _parts: generateParts(10, true) };
//     addToGarageTable(this.vehicle)
//     garage.vehicles.push(this.vehicle)
// }

function generateParts(num, dam) {
    partsList = [];
    for (i = 0; i < num; i++) {
        maxFixTime = Math.floor(Math.random() * 40) + 10;//in minutes 
        maxFixCost = Math.floor(Math.random() * 200) + 50;//in pounds

        if (!dam) brokenLevel = 0; else brokenLevel = Math.random();

        fixTime = maxFixTime * brokenLevel;
        fixCost = Math.floor(maxFixCost * brokenLevel);
        var part = { _id: i, _ref: getLicensePlate(10), _damageLevel: parseFloat(brokenLevel.toFixed(2)), _fixTime: fixTime, _fixCost: fixCost };
        partsList.push(part);
    }
    return partsList;
}

function checkInCar() {
    // function to check in the car
    if (garage.open) {
        var vehicle = pendingCars.shift();
        garage.vehicles.push(vehicle);
    } else {
        return "Sorry The Garage is closed";
    }
}

function checkOutCar(i) {
    // function to check out the car

    if (garage.open) {
        var result = garage.vehicles.filter(function (obj) {
            return obj._id != i;
        });

        var vehicleToDelete = garage.vehicles.filter(function (obj) {
            return obj._id == i;
        });

        if (nSum(vehicleToDelete[0]._parts, "_damageLevel") == 0) garage.profit += nSum(vehicleToDelete[0]._parts, "_fixCost")

        garage.vehicles = result;

        return "successfully checked out\n";
    } else {
        return "Sorry The Garage is closed. Vehicle will be left in until it reopens\n";
    }
}

function fixVehicle(i) {
    if (garage.open) {
        var objIndex = garage.vehicles.findIndex((obj => obj._id == i));
        for (j = 0; j < garage.vehicles[objIndex]._parts.length; j++) {
            garage.vehicles[objIndex]._parts[j]._damageLevel = 0;
        }

        return "Successfully fixed the vehicle\n";
    } else {
        return "Sorry the Garage is currently closed\n";
    }

}

// // ================================================ garage ui functions ==========================================//
function runCommand(cmd) {
    var commands = cmd.split(" ");

    var consoleOutput = "";

    switch (commands[0]) {
        case "open":
            garage.open = true;
            consoleOutput += "The Garage Is Open\n";
            break;

        case "close":
            garage.open = false;
            consoleOutput += "The Garage Is Closed\n";
            break;

        case "clear":
            consoleOutput = "";
            break;

        case "output":
            if (commands.length >= 2) {
                if (commands[1] == "garage") consoleOutput += outputGarage();
                if (commands[1] == "pending") consoleOutput += output(pendingCars);
                if (commands[1] == "created") consoleOutput += output(consolePending);
            } else consoleOutput += "Sorry command not recognised please try: \n  garage or \n  pending or\n  created\n";
            break;

        case "create":
            if (commands.length >= 5) {
                var faults = true;
                if (commands[4] == "NOFAULTS") faults = false;
                var price = (Math.floor(Math.random() * 50000)) + 10000;
                consolePending.push({ _id: pendingIndex, _license: commands[2], _brand: commands[1], _parts: generateParts(commands[3], faults), _price: price });
                pendingIndex++;
                consoleOutput += "Vehicle Succesfully Created\n";
            } else consoleOutput += "Sorry missing some parameters\n";
            break;

        case "check":
            if (commands.length >= 3) {
                if (commands[1] == "in") consoleOutput += checkInCar2(commands[2]);
                if (commands[1] == "out") {
                    consoleOutput += checkOutCar(gId(commands[2]));
                }
            } else if (commands.length >= 2) {
                if (commands[1] == "in" && pendingCars.length > 0) consoleOutput += checkInCar();
                else consoleOutput += "no available car to check in\n";
            }
            break;

        case "fix":
            if (commands.length >= 2) consoleOutput += fixVehicle(gId(commands[1]));
            else consoleOutput += "please input the license plate\n";
            break;

        default:
            consoleOutput += "Help:\n";
            consoleOutput += "check in => check in from the automated check in queue\n";
            consoleOutput += "check in <License plate> => check in from the admin created queue\n";
            consoleOutput += "check out <License plate> => check out from garage\n";
            consoleOutput += "create <make> <license plate> <amount of parts> <NOFAULTS|FAULTS> => create new vehicle\n";
            consoleOutput += "open => open the garage\n";
            consoleOutput += "close => close the garage\n";
            consoleOutput += "fix <license plate> => fix vehicle in the garage\n";
            consoleOutput += "output garage => output content of garage\n";
            consoleOutput += "output created => output content of vehicles you created\n";
            consoleOutput += "output pending => output content of auto generated vehicles\n\n";
            break;

    }
    return consoleOutput;
}
// //=========================================== command line scripts =============================================///
function createVehicle(v) {
    consolePending.push({ _id: pendingIndex, _brand: v.make, _parts: generateParts(v.parts, v.broken), _license: v.license });
    pendingIndex++;
    return v.license + " has been added to the created vehicles pool";
}

function outputGarage() {
    var o = "";

    o += "Open: " + garage.open + "\nVehicles: \n\n";
    for (var i = 0; i < garage.vehicles.length; i++) {
        o += "    Make: " + garage.vehicles[i]._brand + "\n";
        o += "    License Plate: " + garage.vehicles[i]._license + "\n";
        o += "    Damage Level: " + Math.floor(nAverage(garage.vehicles[i]._parts, "_damageLevel") * 100) + "\n";
        o += "    Parts: " + garage.vehicles[i]._parts.length + "\n";
        o += "    Cost: " + nSum(garage.vehicles[i]._parts, "_fixCost") + "\n\n";
    }
    o += "Profits: " + garage.profit + "\n\n";

    return o;
}

function output(list) {
    var o = "";

    for (var i = 0; i < list.length; i++) {
        o += "    License Plate: " + list[i]._license + "\n";
        o += "    Make: " + list[i]._brand + "\n";
        o += "    Damage Level: " + Math.floor(nAverage(list[i]._parts, "_damageLevel") * 100) + "\n";
        o += "    Parts: " + list[i]._parts.length + "\n";
        o += "    Cost: " + nSum(list[i]._parts, "_fixCost") + "\n\n";
    }

    return o;
}

function checkInCar2(lic) {
    // function to check in the car
    //var pendingTable = document.getElementById("pendingVehicles")

    if (garage.open) {

        var result = consolePending.filter(function (obj) {
            return obj._license == lic;
        });

        if (result.length == 0) return ">>> License plate does not exist\n";

        consolePending = consolePending.filter(function (obj) {
            return obj._license != lic;
        });

        garage.vehicles.push(result[0]);

        return ">>> " + lic + " added successfully\n";
    } else {
        return ">>> Sorry The Garage is closed\n";
    }
}

function gId(lic) {
    var result = garage.vehicles.filter(function (obj) {
        return obj._license == lic;
    });

    if (result.length <= 0) return pendingIndex + 25;
    else return result[0]._id;
}

module.exports = {
    _run: runCommand,
    _garage: garage,
    _pendingCars: pendingCars,
    _consolePending: consolePending
    // _getId: gId,
    // _checkInCar2: checkInCar2,
    // _checkInCar: checkInCar,
    // _output: output,
    // _outputGarage: outputGarage,
    // _fixVehicle: fixVehicle,
    // _checkOutCar: checkOutCar,
    // _createCar: createVehicle,
};

//added comment