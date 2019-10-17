const path = require("path");

module.exports = {

    home(req, res, next) {
        res.sendFile(path.join(__dirname, "../", "../", "client-side/public/index.html"));
    }

}