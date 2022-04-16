const crypto = require('crypto');

module.exports = (passport, user) => {
    const User = user;
    const LocalStrategy = require('passport-local').Strategy;

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, cb) {
        const genHash = (pass) => {
            return crypto.createHash('sha256', 'salt').update(pass).digest('hex')
        }

        User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if(user) {
                return cb(null, false, {
                    message: 'email is alredy taken'
                });
            }
            else {
                const userPass = genHash(password);
                const data = {
                    email: email,
                    password: userPass,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname
                };
                User.create(data).then((newUser, created) => {
                    if(!newUser) {
                        return cb(null, false);
                    }
                    if(newUser) {
                        return cb(null, newUser);
                    }
                });
            }
        });
    }
    ));

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });

    passport.deserializeUser((id, cb) => {
        User.findByPk(id).then(user => {
            if(user) {
                cb(null, user.get());
            }
            else {
                cb(user.errors, null);
            }
        });
    });
}

