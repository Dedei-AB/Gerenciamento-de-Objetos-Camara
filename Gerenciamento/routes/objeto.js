const express = require("express");
const router = express.Router();
const connection = require("../config/db"); // Certifique-se de ter a conexão configurada corretamente
const controllers = require("../controllers/objetosController");

router.get("/", controllers.getObjetos);

router.get("/tipos-objeto", controllers.getTipoObjeto);

module.exports = router;
