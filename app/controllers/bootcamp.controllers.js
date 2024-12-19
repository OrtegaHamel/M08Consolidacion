const { Bootcamp, User } = require("../models");
console.log("Modelo Bootcamp: ", Bootcamp); 
// Crear y guardar un nuevo Bootcamp
exports.createBootcamp = async (req, res) => {
  try {
    const { title, cue, description } = req.body;

    // Validar que se reciban los datos requeridos
    if (!title || !cue || !description) {
      return res.status(400).json({ message: "El título, CUE y descripción son requeridos." });
    }

    // Verificar si el modelo Bootcamp tiene el método create
    // if (typeof Bootcamp.create !== 'function') {
    //   return res.status(500).json({ message: "El método 'create' no está disponible en el modelo Bootcamp" });
    // }

    // Crear el nuevo bootcamp
    const newBootcamp = await Bootcamp.create({ title, cue, description });

    res.status(201).json({ message: "Bootcamp creado con éxito", bootcamp: newBootcamp });
  } catch (error) {
    console.error("Error al crear el bootcamp:", error);
    res.status(500).json({ message: "Error al crear el bootcamp", error: error.message });
  }
};

// Agregar un usuario a un Bootcamp
exports.addUser = async (req, res) => {
  try {
    const { bootcampId, userId } = req.body;

    // Buscar el bootcamp y el usuario
    const bootcamp = await Bootcamp.findByPk(bootcampId);
    const user = await User.findByPk(userId);

    if (!bootcamp) {
      return res.status(404).json({ message: "Bootcamp no encontrado" });
    }
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Agregar al usuario al bootcamp (suponiendo que la relación está bien definida)
    await bootcamp.addUser(user);

    res.status(200).json({ message: "Usuario agregado al bootcamp" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al agregar el usuario al bootcamp" });
  }
};

// Obtener todos los Bootcamps
exports.findAll = async (req, res) => {
  try {
    const bootcamps = await Bootcamp.findAll({
      include: {
        model: User,
        as: "users", 
        attributes: ["id", "firstName", "lastName", "email"]
      }
    });

    res.status(200).json({ bootcamps });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los bootcamps" });
  }
};

// Obtener un Bootcamp por su ID
exports.findById = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el bootcamp por ID, incluyendo los usuarios asociados
    const bootcamp = await Bootcamp.findByPk(id, {
      include: {
        model: User,
        as: "users",
        attributes: ["id", "firstName", "lastName", "email"]
      }
    });

    if (!bootcamp) {
      return res.status(404).json({ message: "Bootcamp no encontrado" });
    }

    res.status(200).json({ bootcamp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el bootcamp" });
  }
};
