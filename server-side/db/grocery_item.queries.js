const GroceryItem = require("./models/index").GroceryItem;

module.exports = {

// CREATE ITEM IN GROCERY LIST -----------------------------------------------
    createItem(groceryListId, values, callback) {
        const vals = {
            groceryListID: groceryListId,
            name: values.itemName,
            quantity: values.quantity,
            purchased: false,
            location: values.location
        }
        GroceryItem.findOne({where: {groceryListID: groceryListId, name: vals.name}})
        .then((res) => {
            if (res) {
                callback({errors: [ {message: vals.name + " already exists in this grocery list"} ] })
            } else {
                // create item
                GroceryItem.create(vals)
                .then((response) => {
                    callback(null, response);
                })
                .catch((err) => {
                    callback(err);
                })
            }
        })
    },

// FIND ITEM IN GROCERY LIST --------------------------------------------------
    findOne(groceryListId, itemName, callback) {
        GroceryItem.findOne({where: {groceryListID: groceryListId, name: itemName}})
        .then((item) => {
            callback(null, item);
        })
        .catch((err) => {
            callback(err);
        })
    },

// UPDATE ITEM IN GROCERY LIST ------------------------------------------------
    update(groceryListId, itemName, values, callback) {
        // Find Grocery Item
        GroceryItem.findOne({where: {groceryListID: groceryListId, name: itemName}})
        .then((item) => {
            // See if a grocery item already exists at the new name
            GroceryItem.findOne({where: {groceryListID: groceryListId, name: values.name}})
            .then((response) => {
                // If grocery item already exists send error
                if (response && itemName !== values.name) {
                    callback({errors: [ {message: values.name + " already exists in this grocery list"} ] })
                } else {
                    item.update({name: values.name, quantity: values.quantity, location: values.location})
                    .then(() => {
                        callback(null);
                    })
                    .catch((err) => {
                        callback(err);
                    })
                }
            })
        })
    },

// UPDATE ITEM's PURCHASED VALUE -----------------------------------------------
    updateCheckbox(groceryListId, itemName, valueToChangeTo, callback) {
        GroceryItem.findOne({where: {groceryListID: groceryListId, name: itemName}})
        .then((item) => {
            // If the the value in the database matches the value
            if (item.purchased === valueToChangeTo) {
                callback(null);
            } else {
                item.update({purchased: valueToChangeTo})
                .then(() => {
                    callback(null);
                })
            }
        })
        .catch((err) => {
            callback(err);
        })
    },

// DELETE ITEM IN GROCERY LIST ------------------------------------------------
    delete(groceryListId, itemName, callback) {
        GroceryItem.findOne({where: {groceryListID: groceryListId, name: itemName}})
        .then((item) => {
            item.destroy()
            .then(() => {
                callback(null);
            })
            .catch((err) => {
                callback(err);
            }) 
        })
        .catch((err) => {
            callback(err);
        })
    }

}