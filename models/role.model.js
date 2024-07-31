const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Role = sequelize.define("Role", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return Role;
};

//model for the roles(admin, moderator and what not)
