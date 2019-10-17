const request = require("request");
const server = require("../../server");

const base = "http://localhost:8080/";

describe("/", () => {

    it("should return the home page of the sight", (done) => {
        request(base, (err, res, body) => {
            expect(err).toBeNull();
            expect(res).not.toBeNull();
            done();
        })
    })

})