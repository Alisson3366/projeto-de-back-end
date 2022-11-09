const express = require('express');

const controller = require('../controllers/inicio.controllers');

const router = express.Router();

router.get('/', controller.boasVindas);

router.post('/', controller.entrar);

router.post('/', controller.registrar);

router.post('/login', controller.login);

module.exports = router;
