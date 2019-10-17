const passport = require("passport");

const userQueries = require("../db/user.queries");


module.exports = {

// SIGN UP ---------------------------------------------------------------------------
    signUp(req, res, next) {
        const values = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }
        // Create user, if user already exists, send error
        userQueries.createUser(values, (err, user) => {
            if (err) {
                res.json({messages: {errors: [ {msg: err.errors[0].message} ]}}); //
            } else {
                passport.authenticate("local")(req, res, () => {
                    res.json({username: user.username});
                })
            }
        })
    },

// SIGN IN, WITH CUSTOM CALLBACK HANDLER------------------------------------------------------
    signIn(req, res, next) {
        // Custom callback to handle a user sign-in
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                // Error sent in the correct format so the InfoMessages component can render them
                return res.json({messages: {errors: [ {msg: "Woops, something went wrong, please try again"} ] }})
            } else if (!user) {
                return res.json({messages: {errors: [ {msg: "Wrong username or password"} ] }})
            } else {
                req.logIn(user, function(err) {
                    if (err) { return res.json({messages: {errors: [ {msg: "Woops, something went wrong, please try again"} ] }})}
                    return res.json(user.username);
                });
            }
        })(req, res, next);
    },

// CHECK STATUS --------------------------------------------------------------------------
    checkStatus(req, res) {
        if (req.user) {
            res.json({username: req.user.username});
        } else {
            res.json("Fail")
        }
    },

// SIGN OUT ------------------------------------------------------------------------------
    signOut(req, res, next) {
        req.logout();
        res.json("signed out");
    },
}
