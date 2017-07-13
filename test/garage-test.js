const garageSim = require('../commands/projects/garage.js')

it("creating a vehicle should add the new vehicle to the array", function(){
    garageSim._run("create BENZ RY45KL 7 FAULTS");
    let x = garageSim._consolePending.length

    if(x !== 1){
        throw new Error("Expected length: 1 Actual: " + x)
    }
})

it("checking in a vehicle shoud fail before garage is open", function(){

    garageSim._run("check in RY45KL");
    let x = garageSim._garage.vehicles.length
    
    if(x !== 0){
        throw new Error("Expected length: 0 Actual: " + x)
    }
})

it("open should set the open state of the garage to true", function(){

    garageSim._run("open");
    let x = garageSim._garage.open
    
    if(!x){
        throw new Error("Expected garage.open: true Actual: " + x)
    }
})