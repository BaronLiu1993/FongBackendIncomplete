const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signup = (userData, callback) => {
    User.create({
        username: userData.username,
        email: userData.email,
        password: bcrypt.hashSync(userData.password, 8)
    })
    .then(user => {
        if (userData.roles) {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: userData.roles
                    }
                }
            })
            .then(roles => {
                user.setRoles(roles)
                    .then(() => callback(null, { message: "User was registered successfully!" }))
                    .catch(err => callback({ message: 'Error setting roles', error: err.message }));
            })
            .catch(err => callback({ message: 'Error finding roles', error: err.message }));
        } else {
            user.setRoles([1])
                .then(() => callback(null, { message: "User was registered successfully!" }))
                .catch(err => callback({ message: 'Error setting roles', error: err.message }));
        }
    })
    .catch(err => {
        callback({ message: 'Error during signup', error: err.message });
    });
};

const signin = (loginData, callback) => {
    User.findOne({
        where: {
            username: loginData.username
        }
    })
    .then(user => {
        if (!user) {
            return callback({ message: "User Not found." });
        }

        const passwordIsValid = bcrypt.compareSync(loginData.password, user.password);

        if (!passwordIsValid) {
            return callback({ message: "Invalid Password!" });
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
            algorithm: 'HS256',
            expiresIn: 86400 // 24 hours
        });

        user.getRoles()
            .then(roles => {
                const authorities = roles.map(role => "ROLE_" + role.name.toUpperCase());

                callback(null, {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    roles: authorities,
                    accessToken: token
                });
            })
            .catch(err => callback({ message: 'Error retrieving roles', error: err.message }));
    })
    .catch(err => {
        callback({ message: 'Error during signin', error: err.message });
    });
};

module.exports = {
    signup,
    signin
};

//logic stored here with error handling for auth service