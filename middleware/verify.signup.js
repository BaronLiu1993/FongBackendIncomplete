/*const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

const determineDuplicates = (req, res, next) => {
    const { username, email } = req.body;

    User.findOne({ where: { username } })
        .then(userByUsername => {
            if (userByUsername) {
                return res.status(400).send({ message: "Failed! Username is already in use!" });
            }
            return User.findOne({ where: { email } });
        })
        .then(userByEmail => {
            if (userByEmail) {
                return res.status(400).send({ message: "Failed! Email is already in use!" });
            }
            next();
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).send({ message: `Failed! Role ${req.body.roles[i]} does not exist!` });
            }
        }
    }
    next();
};

module.exports = {
    determineDuplicates,
    checkRolesExisted
}; */

//verify if an individual signed up or not