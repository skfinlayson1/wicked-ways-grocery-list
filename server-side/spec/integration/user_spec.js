const request = require("request");
const server = require("../../server.js");
const base = "http://localhost:8080";

const sequelize = require("../../db/models/index").sequelize;
const User = require("../../db/models/index").User;

// Suites ---------------------------------------------------------
describe("User Routes", () => {

    beforeEach((done) => {
        User.create({
            username: "admin",
            password: 123456,
            email: "shane_finlayson@yahoo.com"
        })
        .then((user) => {
            done();
        })
        .catch((err) => {
            console.log(err);
            done();
        })
    })

    describe("User sign-in/sign-up", () => {
        beforeEach((done) => {
            sequelize.sync({force:true}).then((res) => {
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            })
        })

        // sign up
        it("should sign a user up", (done) => {
            options = {
                url:`${base}/user/sign-up`,
                form: {
                    username: "strix",
                    password: "123456",
                    email: "shane_finlayson@yahoo.com"
                }
            };
            request.post(options, (err, res, body) => {
                expect(err).toBeNull()
                expect(res.statusCode).toBe(200);  
                expect(body).toContain(`{"username":"strix"}`)
                done();
            })
        })
        
        // sign in
        it("should sign a user in", (done) => {
            options = {
                url:`${base}/user/sign-in`,
                form: {
                    username: "shane",
                    password: 123456,
                }
            };
            request.post(options, (err, res, body) => {
                expect(err).toBeNull()
                expect(res.statusCode).toBe(200);                
                expect(body).not.toBeNull();
                done();
            })
        })
    })

// Check status and Sign-out Routes
    describe("user check-status/sign-out", () => {
        beforeEach((done) => {
            sequelize.sync({force:true}).then((res) => {
                this.user;
                User.create({
                    username: "shane",
                    password: 123456,
                    email: "shane_finlayson@yahooo.com"
                })
                .then((user) => {
                    this.user = user;
                    request.get({
                        url: "http://localhost:8080/auth/fake",
                        form: {
                            id: this.user.id,
                            username: this.user.username
                        }
                    }, (err, res, body) => {
                        done();
                    })
                })
                .catch((err) => {
                    console.log(err);
                    done();
                })
            })
            .catch((err) => {
                console.log(err);
                done();
            })
        })

        // check status
        it("should check the user status", (done) => {
            request.get(`${base}/user/check`, (err, res, body) => {
                expect(err).toBeNull()
                expect(res.statusCode).toBe(200);  
                expect(body).toContain(`{"username":"shane"}`)
                done();
            })
        })

        // sign out
        it("should sign the user out", (done) => {
            request.get(`${base}/user/logout`, (err, res, body) => {
                expect(err).toBeNull()
                expect(res.statusCode).toBe(200);  
                expect(body).toContain("signed out");
                done();
            })
        })
    })
})