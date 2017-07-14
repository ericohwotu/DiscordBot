const wTest = require("../commands/api/steam.js");

describe("Steam API Calls", () => {
    it("Search should return a list", (done) => {

        let reply;

        const callback = {
            limit: 70000,
            callback: (x, y, z) => {
                if (y != "London Ashford Airport") {
                    throw new Error("Expected name: London Ashford Airport  Acutal: " + y);
                }
                done();
            },
            prompt: (a) => { a },
            reply: (a) => { 
                if (a.length <= 10) {
                    throw new Error("Expected string length > 10  Acutal: " + a);
                }
                done(); 
            }
        }
        wTest.run("SEARCH", "grand theft auto", callback);

    }).timeout(10000);

    it("should return a string", (done) => {

        let reply;

        const callback = {
            limit: 70000,
            callback: (x, y, z) => wTest.helper(x,y,z),
            prompt: (a) => { a },
            reply: (a) => {
                if (a.length <= 10) {
                    throw new Error("Expected string length > 10  Acutal: " + a);
                }
                done();
            }
        }
        wTest.run("DETAILS", "Grand Theft Auto V", callback);

    }).timeout(10000);
});