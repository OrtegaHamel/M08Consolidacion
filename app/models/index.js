// index.js
const { Sequelize, DataTypes } = require("sequelize"); 
const sequelize = require("../config/conexion.js");

// Importar modelos directamente (sin pasar sequelize y DataTypes)
const User = require("./user.model.js"); 
const Bootcamp = require("./bootcamp.model.js");

// Establecer relaciones entre los modelos
User.belongsToMany(Bootcamp, {
    through: "user_bootcamp",
    as: "bootcamps",
    foreignKey: "user_id",
});
Bootcamp.belongsToMany(User, {
    through: "user_bootcamp",
    as: "users",
    foreignKey: "bootcamp_id",
});

// Exportar conexión y modelos
const db = { sequelize, User, Bootcamp };
module.exports = db;
