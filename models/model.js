//This will probably become a create postings API model instead of handling any actual payments
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Listing = sequelize.define('Listing', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priceInCents: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false, //delete later in pro
    },
    tip: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    senderId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    recipientId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
      },
      isComplete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      accepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
  }, {
    timestamps: true,
  });

  return Listing;
};

//model for creating the listing