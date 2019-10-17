const GroceryList = require("./models/index").GroceryList;
const GroceryItem = require("./models/index").GroceryItem;

module.exports = {

// CREATE NEW GROCERY LIST -------------------------------------------------
    create(username, listName, callback) {
        // Check if List already exists
        GroceryList.findOne({where: {owner: username, name: listName}})
        .then((response) => {
            if (response) {
                callback({errors: [ {message: listName + " already exists"} ] })
            } else {
                // Create list
                GroceryList.create({owner:username, name:listName})
                .then((user) => {
                    callback(null, user);
                })
                .catch((err) => {
                    callback(err);
                })
            }
        })
    },

// FIND ALL GROCERY LISTS RELATED TO THE USER -------------------------------
    findLists(username, callback) {
        GroceryList.findAll({where: {owner:username}})
        .then((lists) => {
            callback(null, lists);
        })
        .catch((err) => {
            callback(err);
        })
    },

// FIND ONE GROCERY LIST ---------------------------------------------------- 
    findOne(username, listName, callback) {
        GroceryList.findOne({where: {owner:username, name:listName}})
        .then((res) => {
            if (!res) {
                callback({errors: [ {message: "Could not find " + listName} ] })
            } else {
                GroceryList.findByPk(res.id, {include: [ {model: GroceryItem, as: "groceryitems"} ] })
                .then((list) => {
                    callback(null, list);
                })
                .catch((err) => {
                    callback(err);
                })
        }
        })
        .catch((err) => {
            callback(err);
        })
    },

// UPDATE GROCERY LIST ------------------------------------------------------
    update(username, groceryListName, values, callback) {
        // Find list
        GroceryList.findOne({where: {owner: username, name: groceryListName}})
        .then((list) => {
            // Check if list already exists with desired new name
            GroceryList.findOne({where: {owner: username, name: values.name}})
            .then((response) => {
                if (response) {
                    callback({errors: [ {message: values.name + " already exists"} ] });
                } else {
                    // Update list
                    list.update({name:values.name})
                    .then((res) => {
                        callback(null, res);
                    })
                    .catch((err) => {
                        callback(err);
                    })
                }
            })
            .catch((err) => {
                callback(err);
            })
        })
        .catch((err) => {
            callback(err);
        })
    },

// DELETE GROCERY LIST -----------------------------------------------------
    deleteList(username, listName, callback) {
        GroceryList.findOne({where: {owner:username, name:listName}})
        .then((list) => {
            GroceryItem.destroy({where: {groceryListID: list.id}})
            .then(() => {
                list.destroy()
                .then(() => {
                    callback(null);
                })
            })
        })
        .catch((err) => {
            callback(err);
        })
    },

// CREATE ITEM IN GROCERY LIST -----------------------------------------------
    createItem(groceryListId, values, callback) {
        const vals = {
            groceryListID: groceryListId,
            name: values.itemName,
            quantity: values.quantity,
            purchased: false,
            location: values.location
        }
        GroceryItem.create(vals)
        .then((response) => {
            callback(null, response);
        })
        .catch((err) => {
            callback(err);
        })
    }

}