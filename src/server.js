const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const env = require('dotenv').config({ path: './.env' });

const models = require('./app/models');

const app = express();
const port = process.env.PORT || 3333;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport init
app.use(session({
    secret: "some secret",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const authRoute = require('./routes/auth.js')(app, passport);
require('../config/passport/passport')(passport, models.user);

//Sync Databe
models.sequelize.sync()
    .then(() => {
        console.log('Sync');
    })
    .catch(err => {
        console.error(err);
    });

app.get('/', (req, res) => {
    res.send('App work');
});

app.listen(port, () => {
    console.log(`Blest-off on ${port}`);
});