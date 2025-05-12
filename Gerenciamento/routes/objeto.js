const express = require("express");
const router = express.Router();
const connection = require("../config/db"); // Certifique-se de ter a conexão configurada corretamente
const controllers = require("../controllers/objetosController");

router.get("/dados-buscar", controllers.buscarObjetos);
router.post("/cadastrar", controllers.cadastrarObjeto);
router.get("/codigo", controllers.gerarCodigo);

module.exports = router;
