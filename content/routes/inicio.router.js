const express = require('express');
const controller = require('../controllers/inicio.controllers');
const router = express.Router();

// Rotas Públicas
router.route('/').get(controller.boasVindas);
router.route('/registro').post(controller.registrar);
router.route('/entrar').post(controller.entrar);

module.exports = router;
