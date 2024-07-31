/*const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

const isAdmin = (req, res, next) => {
    User.findByPk(req.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User not found." });
            }
            user.getRoles()
                .then(roles => {
                    const isAdmin = roles.some(role => role.name === "admin");
                    if (isAdmin) {
                        return next();
                    }
                    res.status(403).send({
                        message: "Require Admin Role!"
                    });
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

const isModerator = (req, res, next) => {
    User.findByPk(req.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User not found." });
            }
            user.getRoles()
                .then(roles => {
                    const isModerator = roles.some(role => role.name === "moderator");
                    if (isModerator) {
                        return next();
                    }
                    res.status(403).send({
                        message: "Require Moderator Role!"
                    });
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

const isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User not found." });
            }
            user.getRoles()
                .then(roles => {
                    const isModeratorOrAdmin = roles.some(role => role.name === "moderator" || role.name === "admin");
                    if (isModeratorOrAdmin) {
                        return next();
                    }
                    res.status(403).send({
                        message: "Require Moderator or Admin Role!"
                    });
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

module.exports = {
    verifyToken,
    isAdmin,
    isModerator,
    isModeratorOrAdmin
}; */

//Checks for roles
