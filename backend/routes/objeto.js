const express = require("express");
const router = express.Router();
const controllers = require("../controllers/objetosController");

router.get("/dados-buscar", controllers.buscarObjetos);
router.get("/dados-buscar-tipo-obj", controllers.buscarObjetosTipoObj);
router.get("/dados-buscar-nome", controllers.buscarObjetosNome);
router.get("/dados-buscar-sala", controllers.buscarObjetosSala);
router.get("/dados-buscar-status", controllers.buscarObjetosStatus);

router.post("/cadastrar", controllers.cadastrarObjeto);
router.get("/salas", controllers.buscarSalas);
router.post("/atualizar", controllers.atualizarObjetos);

module.exports = router;
