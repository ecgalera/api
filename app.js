const express = require("express");

// Variables de entorno
require("dotenv").config();
const PORT = process.env.PORT || 3030;
require("./db/config");

// Levanto el servidor
const server = express();
server.use(express.json());
// Importo la Base de Datos

// Importo las Rutas
const usersRouter = require("./users/usersRouter");

server.listen(PORT, (err) => {
  err
    ? console.log(`Error ${err}`)
    : console.log(`Servidor en http://localhost:${PORT}`);
});

// endpoint get all users --------------------------------------
server.use("/user", usersRouter);

// 404 Todas las peticiones con 404 entran aca (CATCH ALL ROUTE)
server.use((req, res, next) => {
  let error = new Error("Resource not found");
  error.status = 404;
  next(error);
});

// Error handler -------------------------------------------------

server.use((error, req, res, next)=>{
  if(!error.status){
    error.status = 500
  }
  res.status(error.status).json({status: error.status, message: error.message})
})