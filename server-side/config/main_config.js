const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const passportConfig = require("./passport_config");

module.exports = {
    init(app, express) {
        app.use(cors());
        app.use(express.static(path.join(__dirname, "../", "../", "client-side", "build")));
        app.use(bodyParser.urlencoded({extended:true}));
        app.use(bodyParser.json());
        app.use(session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 1.21e+9 }
        }));
        passportConfig.init(app);
    }
}