//imports threes test
let threes = require("../commands/projects/threes");
let fizzbuzz = require("../commands/projects/fizzbuzz");
let squares = require("../commands/projects/square");
let weatherData = require("../commands/api/weather-data");

it("Threes with and input of 3 should give 2", function () {
    let x = threes._run(3);
    if (x !== 2) {
        throw new Error("threes(3) should return 2 but returned " + x);
    }
});

it("Threes with and input of 2 should give 3", function () {
    let x = threes._run(2);
    if (x !== 3) {
        throw new Error("threes(3) should return 3 but returned " + x);
    }
});

// fizzbuzz 
it("FizzBuzz to 20 should return 20 results", function () {
    let x = fizzbuzz._run(20).replace(/\n/g, "").split(" ");
    x.shift()

    if (x.length !== 20) {
        throw new Error("Expected: 20  Actual: " + x.length)
    }
});

it("FizzBuzz to 20 should return 1 fizzbuzz", function () {
    let x = fizzbuzz._run(20).replace(/\n/g, "").split(" ");
    x.shift()

    x = x.filter((x) => {return x.toUpperCase()==="fizzbuzz".toUpperCase()});

    if (x.length !== 1) {
        throw new Error("Expected: 1  Actual: " + x.length)
    }
});

it("FizzBuzz to 20 should return 5 fizz", function () {
    let x = fizzbuzz._run(20).replace(/\n/g, "").split(" ");
    x.shift()

    x = x.filter((x) => {return x.toUpperCase()==="fizz".toUpperCase()});

    if (x.length !== 5) {
        throw new Error("Expected: 6  Actual: " + x.length)
    }
});

it("FizzBuzz to 25 should return 4 buzz", function () {
    let x = fizzbuzz._run(20).replace(/\n/g, "").split(" ");
    x.shift()

    x = x.filter((x) => {return x.toUpperCase()==="buzz".toUpperCase()});

    if (x.length !== 3) {
        throw new Error("Expected: 6  Actual: " + x.length)
    }
});

//squares
it("Squares should return false if width is 0", function(){
    let x = squares._run("HELLO", 0, 5);
    if(x){
        throw new Error("Should be false but got true")
    }
});

it("Squares should return false if height is 0", function(){
    let x = squares._run("HELLO", 5, 0);
    if(x){
        throw new Error("Should be false but got true")
    }
});

it("Squares should be a string if width and height are not 0", function(){
    let x = squares._run("HELLO", 2, 2);

    if(x instanceof String){
        throw new Error("Ecpected: String  But recieved: somethign else");
    }
});
