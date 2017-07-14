"using strict";

function fizzbuzz(n) {

    let msg = "\n";

    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            msg += " FizzBuzz\n";
        } else if (i % 3 === 0) {
            msg += " Fizz";
        } else if (i % 5 === 0) {
            msg += " Buzz";
        } else {
            msg += " "+i;
        }
    }
    return msg;
}

//export modules
module.exports = {
    _run: fizzbuzz
}