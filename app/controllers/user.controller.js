const jwt = require("jsonwebtoken");
const { secret } = require("../config/auth.config");
const db = require("../models");
const User = db.User;
const Bootcamp = db.Bootcamp;


module.exports = {
    createUser: async (req, res) => {
        try {
            const { firstName, lastName, email, password } = req.body;
            const newUser = await User.create({ firstName, lastName, email, password });
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: "Error al crear usuario", error });
        }
    },

    signin: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Buscar el usuario por su correo electrónico
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            // Verificar si la contraseña es correcta
            if (user.password !== password) {
                return res.status(401).json({ message: "Contraseña incorrecta" });
            }

            // Crear el token
            const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1h" });

            // Responder con el token y los detalles del usuario
            res.status(200).json({
                message: "Inicio de sesión exitoso",
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                },
                token: token
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al iniciar sesión", error });
        }

    },



    findUserById: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id, {
                include: {
                    model: Bootcamp,
                    as: "bootcamps", // Alias definido en el modelo User
                },
            });

            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al obtener usuario", error });
        }
    },


    findAll: async (req, res) => {
        try {
            const users = await User.findAll({ include: "bootcamps" });
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener usuarios", error });
        }
    },

    updateUserById: async (req, res) => {
        try {
            const { firstName, lastName } = req.body;
            const updatedUser = await User.update({ firstName, lastName }, { where: { id: req.params.id } });
            if (!updatedUser[0]) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
            res.status(200).json({ message: "Usuario actualizado correctamente" });
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar usuario", error });
        }
    },

    deleteUserById: async (req, res) => {
        try {
            const deleted = await User.destroy({ where: { id: req.params.id } });
            if (!deleted) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
            res.status(200).json({ message: "Usuario eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar usuario", error });
        }
    },
};
