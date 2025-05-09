const express = require("express");
const router = express.Router();
const connection = require("../config/db"); // Certifique-se de ter a conexão configurada corretamente
const controllers = require("../controllers/objetosController");


router.get("/dados-busca", controllers.buscarObjetos);
router.get('/cadastrar', controllers.cadastrarObjeto);

module.exports = router;