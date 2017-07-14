'using strict';

function threes(n){
    let count=0;
    while(n>1){
        if(n % 3 === 0){
            n = n / 3;
        }else if(n % 3 === 1){
            n --;
        }else if(n % 3 === 2){
            n ++;
        }
        count ++;
    }

    return count;
}

module.exports = {
    _run: threes
};