const bcrypt = require("bcryptjs");
const User = require("./models/index").User;

module.exports = {

    createUser(values, callback) {
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(values.password, salt);
        values.password = hashedPassword;

        User.create(values)
        .then((user) => {
            callback(null, user);
        })
        .catch((err) => {
            callback(err);
        })
    }

}