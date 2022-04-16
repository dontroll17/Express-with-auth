const crypto = require('crypto');

const genHash = (pass) => {
    return crypto.createHash('sha256', 'salt').update(pass).digest('hex')
}

module.exports = (passport, user) => {
    const User = user;
    const LocalStrategy = require('passport-local').Strategy;

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, cb) {

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

    passport.use('local-signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, cb) {
        const User = user;
        const isValidPass = (userpass, pass) => {
            return pass === userpass;
        }

        User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if(!user) {
                return cb(null, false, {
                    message: 'Email does not exist'
                });
            }
            if(!isValidPass(user.password, genHash(password))) {
                return cb(null, false, {
                    message: 'Incorrect pass'
                });
            }
            const userinfo = user.get();
            return cb(null, userinfo);
        }).catch(err => {
            console.error(`Error: ${err}`);
            return cb(null, false, {
                message: 'Something wrong'
            });
        });
    }));

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

