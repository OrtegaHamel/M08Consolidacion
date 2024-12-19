const { DataTypes } = require("sequelize");
const sequelize = require("../config/conexion.js");

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {
                args: true,
                msg: "El Campo del nombre es requerido"
            },
        },
    },
    lastName: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {
                args: true,
                msg: "El Campo del apellido es requerido"
            },
        },
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {
                args: true,
                msg: "El correo electrónico es requerido"
            },
            isEmail: {
                args: true,
                msg: 'Formato de correo inválido'
            }
        },
        // unique: {
        //     args: true,
        //     msg: 'Correo electrónico actualmente registrado en la base de datos!'
        // }
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {
                args: true,
                msg: "La contraseña es requerida"
            }
        }
    }
}, {
    tableName: 'users',  // Especificamos el nombre de la tabla en minúsculas
    timestamps: true
});

module.exports = User;

