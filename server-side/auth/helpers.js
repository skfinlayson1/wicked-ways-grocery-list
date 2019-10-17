const bcrypt = require("bcryptjs");

module.exports = {

    ensureAuthenticated(req, res, next) {
        if (!req.user) {
            return res.json({messages: {errors: [ {msg: "You must be signed in to do that"} ]}});
        } else {
            next();
        }
    },

    comparePass(userPassword, databasePassword) {
        return bcrypt.compareSync(userPassword, databasePassword);
    }

}