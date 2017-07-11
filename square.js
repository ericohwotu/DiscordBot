'use strickt';

function sq(str, width = 1, height = 1) {
    result = "";
    let rsa = str.split("");
    let dx = -1;
    let dy = -1;
    var x = 0;
    var y = 0;

    for (i = 0; i < (rsa.length * width)-(width-1); i++) {

        if (x === rsa.length - 1 || x === 0) {
            dx = -dx;
        }

        y = 0
        for (j = 0; j < (rsa.length * height)-(height-1); j++) {

            if (y === rsa.length - 1 || y === 0) {
                dy = -dy;
            }
           
            if (y === 0) {
                result += rsa[x]
            } else if (x === 0) {
                result += rsa[y];
            }else if (y === rsa.length) {
                result += rsa[x];
            } else if (x === rsa.length) {
                result += rsa[y];
            }  else {
                result += " ";
            }
            y += dy;
        }
        result += "\n"
        x += dx;
    }
    return result
}

console.log(sq("demigogue",2,2))
console.log(sq("hymn", 2, 2))
console.log(0 % 5)

// var x = i % rsa.length
            // var y = j % rsa.length