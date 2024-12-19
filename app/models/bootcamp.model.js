const sequelize = require("../config/conexion.js");
const { DataTypes } = require("sequelize");

const Bootcamp = sequelize.define(
    "Bootcamp",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "El campo nombre (title) es requerido",
                },
            },
        },
        cue: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Números de CUE es necesario, mínimo 5 y máximo 20",
                },
                isInt: {
                    args: true,
                    msg: "Debes introducir un número entero",
                },
                max: 20,
                min: 5,
            },
        },
        description: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Se debe introducir una descripción",
                },
            },
        },
    },
    {
        tableName: "bootcamps", // Nombre explícito de la tabla
        timestamps: true,       // Habilita createdAt y updatedAt
    }
);

module.exports = Bootcamp;

    
