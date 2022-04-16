const authController = require('../controllers/authController.js');

module.exports = (app, passport) => {
    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.get('/dashboard', loggedIn, authController.dashboard);
    app.get('/logout', authController.logout);
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
    }));
    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/signin'
    }));

    function loggedIn(req, res, next) {
        console.log(req.isAuthenticated())
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect('/signin');
    }
}