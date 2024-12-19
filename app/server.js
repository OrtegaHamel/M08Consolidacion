const express = require("express");
const app = express();
const port = 3000;
const userRoutes = require("./routes/user.routes");
const bootcampRoutes = require("./routes/bootcamp.routes")
const secret = require("./config/auth.config");
const db = require("./models"); 

const jwt = require("jsonwebtoken");
app.use(express.json());
app.use("/api", userRoutes, bootcampRoutes);

app.get("/", (req, res) => {
    res.send("Servidor en ejecución correctamente");
});


// Sincronizar la base de datos y luego iniciar el servidor
db.sequelize.sync().then(() => {
    console.log("Base de datos sincronizada");
    app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));
}).catch((error) => {
    console.log("Error al sincronizar la base de datos:", error);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: "Ocurrió un error en el servidor" });
});

// if (!process.env.JWT_SECRET) {
//     throw new Error("JWT_SECRET no está definido en las variables de entorno");
// }


// const listEndpoints = require("express-list-endpoints");
// console.log(listEndpoints(app));


