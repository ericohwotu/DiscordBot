const garageSim = require('../commands/projects/garage.js');

describe("Garage Console", () => {

    describe("Create Vehicle", () => {

        it("Should add the new vehicle to the array", function () {
            garageSim._run("create BENZ RY45KL 7 FAULTS");
            let x = garageSim._consolePending.length

            if (x !== 1) {
                throw new Error("Expected length: 1 Actual: " + x)
            }
        });
    });

    describe("Open Garage", () => {
        it("should set the open state of the garage to true", function () {

            garageSim._run("open");
            let x = garageSim._garage.open

            if (!x) {
                throw new Error("Expected garage.open: true Actual: " + x)
            }
        });
    })

    describe("Close Garage", () => {
        it("Should should set the open state of the garage to false", function () {

            garageSim._run("close");
            let x = garageSim._garage.open

            if (x) {
                throw new Error("Expected garage.open: false Actual: " + x)
            }
        });
    });


    describe("Check In", () => {
        it("shoud fail before garage is open", function () {
            garageSim._run("close");
            garageSim._run("check in RY45KL");
            let x = garageSim._garage.vehicles.length

            if (x !== 0) {
                throw new Error("Expected length: 0 Actual: " + x);
            }
        });

        it("should increase the amount of vehicles in the garage", function () {
            garageSim._run("open");
            garageSim._run("check in RY45KL");
            let x = garageSim._garage.vehicles.length

            if (x !== 1) {
                throw new Error("Expected length: 1 Actual: " + x);
            }
        });
    });

    describe("Garage Contents", () => {
        it("The first vehicle should have a license plate of RY45KL", function () {
            let x = garageSim._garage.vehicles[0]._license

            if (x !== "RY45KL") {
                throw new Error("Expected length: RY45KL Actual: " + x)
            }
        });

        it("RY45KL should have seven parts", function () {

            let x = garageSim._garage.vehicles[0]._parts.length;

            if (x !== 7) {
                throw new Error("Expected length: 7 Actual: " + x)
            }
        });

        it("RY45KL should have the first part damaged", function () {

            let x = garageSim._garage.vehicles[0]._parts[0]._damageLevel;

            if (x === 0) {
                throw new Error("Expected damage > 0 Actual: " + x)
            }
        });
    });

    describe("Fix RY45KL", () => {
        it("should have its damage level unchanged if garage is closed", function () {
            garageSim._run("close")
            garageSim._run("fix RY45KL")
            let x = garageSim._garage.vehicles[0]._parts[0]._damageLevel;

            if (x === 0) {
                throw new Error("Expected damage: 0 Actual: " + x)
            }
        });

        it("should have its damage level reduced to 0 if garage is open", function () {
            garageSim._run("open")
            garageSim._run("fix RY45KL")
            let x = garageSim._garage.vehicles[0]._parts[0]._damageLevel;

            if (x !== 0) {
                throw new Error("Expected damage: 0 Actual: " + x)
            }
        });
    });

    describe("Check out RY45KL", () => {
        it("Checking out RY45KL should have no effect if garage is closed", function () {
            garageSim._run("close")
            garageSim._run("check out RY45KL")
            let x = garageSim._garage.vehicles.length;

            if (x === 0) {
                throw new Error("Expected vehicles: 1 Actual: " + x)
            }
        });

        it("Checking out RY45KL should remove it from the garage if garage is open", function () {
            garageSim._run("open")
            garageSim._run("check out RY45KL")
            let x = garageSim._garage.vehicles.length;

            if (x !== 0) {
                throw new Error("Expected vehicles: 0 Actual: " + x)
            }
        });
    });
});




