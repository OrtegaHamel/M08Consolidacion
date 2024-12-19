const db = require("../models");
const User = db.User;

const verifySignUp = async (req, res, next) => {
  try {
    // Verificar si el correo electrónico ya existe
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      return res.status(400).json({ message: "Correo electrónico ya registrado" });
    }
    next(); 
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al verificar el correo" });
  }
};

module.exports = { verifySignUp };
