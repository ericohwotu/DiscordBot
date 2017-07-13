'use strict';

function sq(str, width = 1, height = 1) {
    let result = "**```css\n";
    let rsa = str.split("");
    let dx = -1;
    let dy = -1;
    let x = 0;
    let y = 0;

    for (let i = 0; i < (rsa.length * width)-(width-1); i++) {

        //get the value of x by either adding or subtracting to it
        if (x === rsa.length - 1 || x === 0) { dx = -dx; }

        //reset the y variables for the next run
        y = 0;
        dy = -Math.abs(dy);
         
        for (let j = 0; j < (rsa.length * height)-(height-1); j++) {

            //get the value of x by either adding or subtracting to it
            if (y === rsa.length - 1 || y === 0) { dy = -dy; }

            // print out ht characters
            if (y === 0) {
                result += rsa[x] + " ";
            } else if (x === 0) {
                result += rsa[y]+ " ";
            }else if (y === rsa.length-1) {
                result += rsa[(rsa.length-x)-1]+ " ";
            } else if (x === rsa.length-1) {
                result += rsa[(rsa.length-y)-1]+ " ";
            }  else {
                result += "  ";
            }

            //increment / decrement y
            y += dy;
        }
        result += "\n";

        //increment / decrement x
        x += dx;
    }
    result += "```**"
    return result;
}

module.exports = {
    _run: sq
}