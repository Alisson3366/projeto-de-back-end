const express = require('express');
const controller = require('../controllers/inicio.controllers');
const router = express.Router();

// Rotas Públicas
router.get('/', controller.boasVindas);
router.post('/registro', controller.registrar);
router.post('/entrar', controller.entrar);

module.exports = router;
