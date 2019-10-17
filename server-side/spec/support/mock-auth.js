module.exports = {

    fakeIt(app) {
        let id, username;

        function middleware(req, res, next) {
            id = req.body.id || id;
            username = req.body.username || username;


            if(id && id != 0) {
                req.user = {
                    id: id,
                    username: username
                };
            } else if(id == 0) {
                delete req.user;
            }

            if( next ) {next()}
        }

        function route(req, res) {
            res.json("fake logged in");
        }

        app.use(middleware);
        app.get("/auth/fake", route);
    }
    
}