const dbConfig = require("../config/db.config.js");
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize instance
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, DataTypes);
db.role = require("../models/role.model.js")(sequelize, DataTypes);
db.listing = require("../models/model.js")(sequelize, DataTypes);
db.geo = require("../models/geo.data.model.js")(sequelize, DataTypes); // Adjust path as necessary

db.role.belongsToMany(db.user, { through: "user_roles" });
db.user.belongsToMany(db.role, { through: "user_roles" });


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;

//configure sequelize for the models to work with the progresql databse