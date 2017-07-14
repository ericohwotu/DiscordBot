const wTest = require("../commands/api/weather.js");

describe("Weather API Calls", () => {
    it("25th element should be London Ashford Airport", (done) => {

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
            reply: (a) => { a },
            collector: (a) => {
                return {
                    on:
                    (x, y) => y(26),
                    stop: () => 1
                }
            }
        }
        wTest.run("london", callback);

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
            },
            collector: (a) => {
                return {
                    on:
                    (x, y) => y(26),
                    stop: () => 1
                }
            }
        }
        wTest.run("london", callback);

    }).timeout(10000);
});
