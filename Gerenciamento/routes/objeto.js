const express = require('express');
const router = express.Router();
const controller = require('../controllers/objetosController');

router.get('/', controller.getObjetos);

module.exports = router;