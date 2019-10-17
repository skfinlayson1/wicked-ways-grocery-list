const server = require("../../server");
const request = require("request");
const base = "http://localhost:8080";

const sequelize = require("../../db/models/index").sequelize;
const User = require("../../db/models/index").User
const GroceryList = require("../../db/models/index").GroceryList;

describe("Grocery List Routes", () => {
    beforeEach((done) => {
        sequelize.sync({force:true}).then((res) => {
            User.create({
                username: "shane",
                password: 123456,
                email: "shane_finlayson@yahoo.com"
            })
            .then((user) => {
                GroceryList.create({
                    owner: "shane",
                    name: "Standard"
                })
                .then((list) => {
                    request.get({
                        url: "http://localhost:8080/auth/fake",
                        form: {
                            id: user.id,
                            username: user.username
                        }
                    }, (err, res, body) => {
                        done();
                    })
                })
            })
            .catch((err) => {
                console.log(err)
                done();
            })
        })
    })

// CHECK FOR CHANGE ------------------------------------------------------------------
    describe("/check-for-change", () => {

        // Returns single list
        it("should retutn single list", (done) => {
            request.get(`${base}/grocery-list/check`, (err, res, body) => {
                expect(body).toContain(`"id":1,"owner":"shane","name":"Standard"`)
                done();
            })

        })

        // Returns lists when new lists are present
        it("should return grocery lists", (done) => {
            GroceryList.create({
                name: "New List",
                owner: "shane"
            })
            .then((lists) => {
                request.get(`${base}/grocery-list/check`, (err, res, body) => {
                    expect(body).toContain(`"id":2,"owner":"shane","name":"New List"`)
                    done();
                })
            })
            .catch((err) => {
                console.log(err);
                done();
            })
        })

    })

// Create and Delete ------------------------------------------------
    describe("/create-list && /delete-list", () => {
        
        // create list
        it("should create a grocery list", (done) => {
            const values = {
                url: `${base}/grocery-list/create-list`,
                form: {
                    username: "shane",
                    name: "New List"
                }
            }
            request.post(values, (err, res, body) => {
                expect(body).toContain("created new list");
                done();
            })
        })

        // delete list
        it("should delete the list", (done) => {
            request.post({
                url: `${base}/grocery-list/delete-list`,
                form: {
                    username: "shane",
                    listName: "Standard"
                }
            }, (err, res, body) => {
                expect(body).toContain("List Deleted")
                done();
            })
        })

    })

// Show -----------------------------------------
    describe("/grocery-list/show/:name", () => {

        // Return list
        it("should return the list", (done) => {
            request.get(`${base}/grocery-list/show/Standard`, (err, res, body) => {
                expect(body).toContain(`"id":1,"owner":"shane","name":"Standard"`)
                done();
            })
        })

        // Error on list
        it("should return an error if no list is found", (done) => {
            request.get(`${base}/grocery-list/show/StandardWRONG`, (err, res, body) => {
                expect(body).toContain(`{"messages":{"errors":[{"msg":"Could not find StandardWRONG"}]}}`)
                done();
            })
        })

    })

// Update --------------------------------------
    describe("/grocery-list/update", () => {

        // Update list
        it("should update the lists name", (done) => {
            const values = {
                url: `${base}/grocery-list/update/Standard`,
                form: {
                    name: "Standarder"
                }
            }
            request.post(values, (err, res, body) => {
                expect(body).toContain("Success");
                done();
            })
        })

    })

})