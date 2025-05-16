const express = require("express");
const router = express.Router();
const connection = require("../config/db"); // Certifique-se de ter a conexão configurada corretamente
const controllers = require("../controllers/objetosController");

router.get("/dados-buscar", controllers.buscarObjetos);
router.post("/cadastrar", controllers.cadastrarObjeto);
router.get("/salas", controllers.buscarSalas);
router.get("/dados-buscar/:id", controllers.buscarObjetoAtualizar);

module.exports = router;
