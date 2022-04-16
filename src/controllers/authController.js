const { resolve } = require('path');

exports.signup = (req, res) => {
    res.sendFile(resolve(__dirname + '../../../views/signup.html'))
}

exports.dashboard = (req, res) => {
    res.sendFile(resolve(__dirname + '../../../views/dashboard.html'))
}