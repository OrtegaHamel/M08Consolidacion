const { Sequelize }= require("sequelize")
const dbConfig = require("./db.config.js");

// Establecer la conexión con la base de datos
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    port: dbConfig.PORT,
    define: {
        freezeTableName: true,
    },
});

module.exports = sequelize