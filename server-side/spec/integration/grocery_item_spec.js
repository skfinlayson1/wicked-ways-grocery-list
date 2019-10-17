const server = require("../../server");
const request = require("request");
const base = "http://localhost:8080";

const sequelize = require("../../db/models/index").sequelize;
const User = require("../../db/models/index").User
const GroceryList = require("../../db/models/index").GroceryList;
const GroceryItem = require("../../db/models/index").GroceryItem;

describe("Grocery Item Routes", () => {
    
    beforeEach((done) => {
        this.user;
        this.groceryList;
        this.groceryItem;
        sequelize.sync({force:true}).then((res) => {
            User.create({
                username: "shane",
                password: "123456",
                email: "shane_finlayson@yahoo.com"
            })
            .then((user) => {
                this.user = user;
                GroceryList.create({
                    owner: this.user.username,
                    name: "Standard"
                })
                .then((list) => {
                    this.groceryList = list;
                    GroceryItem.create({
                        groceryListID: this.groceryList.id,
                        name: "water",
                        quantity: 5,
                        purchased: false,
                        location: "Anywhere"
                    })
                    .then((item) => {
                        this.groceryItem = item;
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
                })
            })
            .catch((err) => {
                console.log(err);
                done();
            })
        })
    })

// Create and Delete --------------------------------------------
    describe("/create-item && /delete-item/:groceryListName/:itemName", () => {
        
        // Create Item
        it("should create a new item", (done) => {
            const options = {
                url: `${base}/grocery-item/create-item`,
                form: {
                    groceryListName: this.groceryList.name,
                    itemName: "sugar",
                    quantity: "1",
                    location: "Walmart"
                }
            }
            request.post(options, (err, res, body) => {
                expect(body).toContain("Item created")
                done();
            })
        })

        // Delete Item
        it("should delete a item from list", (done) => {
            request.get(`${base}/grocery-item/delete/${this.groceryList.name}/${this.groceryItem.name}`, (err, res, body) => {
                expect(body).toContain("Deleted")
                done();
            })
        })
    })

// Find and Update ----------------------------------------------
    describe("/find-item/:groceryListName/:itemName && update", () => {

        // Find Item
        it("should locate a specific item in list", (done) => {
            request.get(`${base}/grocery-item/find/${this.groceryList.name}/${this.groceryItem.name}`, (err, res, body) => {
                expect(body).toContain(`"id":1,"groceryListID":1,"name":"water","quantity":5,"purchased":false,"location":"Anywhere"`)
                done();
            })
        })

        // Update Item
        it("should update specified item", (done) => {
            const options = {
                url: `${base}/grocery-item/update/${this.groceryList.name}/${this.groceryItem.name}`,
                form: {
                    name: "h20",
                    quantity: "10",
                    location: "Costco"
                }
            }
            request.post(options, (err, res, body) => {
                expect(body).toContain("Updated");
                done();
            })
        })

    })

// Update Checkbox ----------------------------------------------
    describe("/update-item-checkbox/:groceryListName/:itemName", () => {

        // update item checkbox
        it("should update a specific item's checkbox", (done) => {
            const options = {
                url: `${base}/grocery-item/update-checkbox/${this.groceryList.name}/${this.groceryItem.name}`,
                form: {
                    purchased: true
                }
            }
            request.post(options, (err, res, body) => {
                expect(body).toContain("Updated Checkbox")
                done();
            })
        })

    })

})