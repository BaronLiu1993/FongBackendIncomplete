const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  //connect this with the user information as of right now
    const Geo = sequelize.define('geo', {
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: true
          },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: true
          },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
          },
    });
    return Geo;
} 
//model for the location data to be stored
