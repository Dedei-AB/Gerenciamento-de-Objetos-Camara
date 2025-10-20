const express = require("express");
const router = express.Router();
const visitasController = require("../controllers/visitasController");

// Listagens
router.get("/pessoa_visita", visitasController.listarVisitasConcluidas);
router.get("/pessoa_camara", visitasController.listarPessoasNaCamara);

// Registro de entrada e saída
router.post("/entrada_de_pessoas", visitasController.registrarEntrada);
router.post("/finalizarVisita", visitasController.registrarSaidaComNovaPessoa);
router.post("/finalizar/:id", visitasController.finalizarVisita);

// Edição de pessoa
router.get("/pessoa/:id", visitasController.buscarPessoa);
router.post("/pessoas/editar/:id", visitasController.editarPessoa);

module.exports = router;
