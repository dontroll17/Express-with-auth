const { resolve } = require('path');

exports.signup = (req, res) => {
    res.sendFile(resolve(__dirname + '../../../views/signup.html'))
}

exports.dashboard = (req, res) => {
    res.sendFile(resolve(__dirname + '../../../views/dashboard.html'))
}

exports.signin = (req, res) => {
    res.sendFile(resolve(__dirname + '../../../views/signin.html'))
}

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if(err) {
            console.error(err);
        }
        res.redirect('/signin');
    })
}