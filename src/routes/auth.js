const authController = require('../controllers/authController.js');

module.exports = app => {
    app.get('/signup', authController.signup);
}