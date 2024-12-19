const jwt = require("jsonwebtoken");
const { secret } = require("../config/auth.config");

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // "Bearer <token>"

    if (!token) {
        return res.status(403).json({ message: "No se proporcionó un token" });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token inválido" });
        }
        req.userId = decoded.id; // Guarda el ID del usuario en la solicitud
        next();
    });
};

module.exports = { verifyToken };

