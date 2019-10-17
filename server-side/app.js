const express = require("express");

const mainConfig = require("./config/main_config");
const routeConfig = require("./config/route_config");

const app = express();

mainConfig.init(app, express)
routeConfig.init(app);

module.exports = app;