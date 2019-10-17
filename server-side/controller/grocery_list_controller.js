const groceryListQueries = require("../db/grocery_lists.queries");

module.exports = {

// CREATE GROCERY LIST ----------------------------------------------------------------
    createList(req, res) {
        groceryListQueries.create(req.body.username, req.body.name, (err, newList) => {
            if (err) {
                res.json({messages: {errors: [ {msg: err.errors[0].message} ] }})
            } else {
                res.json("created new list");
            }
        })
    },

// FIND SPECIFIC GROCERY LIST --------------------------------------------------------
    find(req, res) {
        groceryListQueries.findOne(req.user.username, req.params.name, (err, list) => {
            if (err) {
                res.json({messages: {errors: [ {msg: err.errors[0].message} ] }})
            } else if (!list) {
                res.json({messages: {errors: [ {msg: "Could not find " + req.params.name} ] }});
            } else {
                res.json(list);
            }
        })
    },

// UPDATE LIST ------------------------------------------------------------------------
    update(req, res) {
        groceryListQueries.update(req.user.username, req.params.name, req.body, (err, response) => {
            if (err) {
                res.json({messages: {errors: [ {msg: err.errors[0].message} ] }})
            } else {
                res.json("Success");
            }
        })
    },

// DELETE LIST ------------------------------------------------------------------------
    deleteList(req, res) {
        groceryListQueries.deleteList(req.body.username, req.body.listName, (err, response) => {
            if (err) {
                res.json({messages: {errors: [ {msg: err.errors[0].message} ] }});
            } else {
                res.json("List Deleted");
            }
        })
    },

// SEND ALL GROCERY LIST ASSOCIATED WITH THE USER -------------------------------------
    checkForChange(req, res) {
        if (req.user) {
             groceryListQueries.findLists(req.user.username, (err, lists) => {
                 if (err) {
                    res.json(err);
                 } else if (lists.length < 1) {
                    res.json("No grocery lists found")
                 } else {
                    res.json({data: lists})
                 }
             })
        } else {
            res.json("Not signed in")
        }
    }

}