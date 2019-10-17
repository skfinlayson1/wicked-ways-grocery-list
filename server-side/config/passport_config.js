const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

const User = require("../db/models/index").User;
const authHelper = require("../auth/helpers");

module.exports = {

    init(app) {
        app.use(passport.initialize());
        app.use(passport.session());

        passport.use(new LocalStrategy((username, password, done) => {
            User.findOne({where: {username}})
            .then((user) => {
                if(!user || !authHelper.comparePass(password, user.password)) {
                    return done(null, false, {message: "Invalid email or password"});
                }

                return done(null, user);
            })
        }));

        passport.serializeUser((user, done) => {
            done(null, user.id);
        });
          
        passport.deserializeUser((id, done) => {
            User.findByPk(id)
            .then((user) => {
                if (!user) {
                    done(user);
                } else {
                    done(null, user);
                }
            })
        });

    }

}