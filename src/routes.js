const express = require("express");

const CadastroController = require("./controller/cadastroController");
const LoginController = require("./controller/loginController");

const routes = express.Router();

routes.post("/cadastro", CadastroController.create);
routes.post("/login", LoginController.signin);
routes.post("/validateToken", LoginController.validateToken);

module.exports = routes;
