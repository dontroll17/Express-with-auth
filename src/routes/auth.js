const authController = require('../controllers/authController.js');

module.exports = (app, passport) => {
    app.get('/signup', authController.signup);
    app.get('/dashboard', authController.dashboard);
    
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
    }));
}