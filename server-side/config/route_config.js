

module.exports = {

    init(app) {

        const homeRoutes = require("../routes/home_routes");
        const userRoutes = require("../routes/user_routes");
        const groceryListRoutes = require("../routes/grocery_list_routes");
        const groceryItemRoutes = require("../routes/grocery_item_routes");

        if(process.env.NODE_ENV === "test") {
            const mockAuth = require("../spec/support/mock-auth");
            mockAuth.fakeIt(app);
        }

        app.use(homeRoutes);
        app.use(userRoutes);
        app.use(groceryListRoutes);
        app.use(groceryItemRoutes);
        
    }

}