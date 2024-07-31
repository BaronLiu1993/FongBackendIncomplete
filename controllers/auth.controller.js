const authService = require('../services/auth.service');

const signup = (req, res) => {
    authService.signup(req.body, (err, response) => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }
        res.status(200).send(response);
    });
};

const signin = (req, res) => {
    authService.signin(req.body, (err, response) => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }
        res.status(200).send(response);
    });
};

module.exports = {
    signup,
    signin
};

//controller route that outputs callback functions for the routes to handle for the authentication service
