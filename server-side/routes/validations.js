const { check, validationResult } = require("express-validator");

module.exports = {

    createNewUserValidations: [
        check("username", "Username: must be five characters or longer").isLength({min: 5}),
        check("username", "Username: must be less than 20 characters").isLength({max: 20}),
        check("password", "Password: must be five characters or longer").isLength({min: 5}),
        check("password", "Password: must be less than 25 characters").isLength({max: 25}),
        check("email", "Email: must be a valid email").isEmail(),
        check("email", "Email: must not be empty").not().isEmpty(),
        check("emial", "Email: must be less than 100 characters").isLength({max: 100})
    ],

    signInUserValidations: [
        check("username", "Username: must be five characters or longer").isLength({min: 5}),
        check("username", "Username: must be less than 20 characters").isLength({max: 20}),
        check("password", "Password: must be five characters or longer").isLength({min: 5})
    ],

    createEditNewGroceryListValidations: [
        check("name", "Name: must be three characters or longer").isLength({min: 3}),
        check("name", "Name: must be less than 20 characters").isLength({max: 20})
    ],

    createEditNewGroceryItemValidations: [
        check("itemName", "Item Name: must contain atleast one character").isLength({min: 1}),
        check("itemName", "Item Name: must be less than 15 characters").isLength({max: 15}),
        check("quantity", "Quantity: must be an integer").isInt(),
        check("quantity", "Quantity: must be greater than zero").isInt({gt:0}),
        check("quantity", "Quantity: must be less than 10 characters").isLength({max: 10}),
        check("location", "Locations: must not be empty").not().isEmpty(),
        check("location", "Location: must not be longer than 15 characters").isLength({max: 15})
    ],

    signedInValidator(req, res, next) {
        if (!req.user) {
            res.json({messages:{errors: "You must be signed in to do that"}})
        } else {
            next();
        }
    },

    validator(req, res, next) {

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            res.json({messages: errors})
        } else {
            next();
        }
    }

}