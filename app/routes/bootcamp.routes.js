const express = require("express");
const router = express.Router();
const bootcampController = require("../controllers/bootcamp.controllers");
const { verifyToken } = require("../middleware/auth");

// Ruta para crear un nuevo Bootcamp
router.post("/bootcamp", verifyToken, bootcampController.createBootcamp);

// Ruta para agregar un usuario a un bootcamp
router.post("/bootcamp/adduser", verifyToken, bootcampController.addUser);

// Ruta para obtener todos los bootcamps
router.get("/bootcamp", bootcampController.findAll);

// Ruta para obtener un bootcamp por su id, incluyendo usuarios
router.get("/bootcamp/:id", verifyToken, bootcampController.findById);

module.exports = router;
