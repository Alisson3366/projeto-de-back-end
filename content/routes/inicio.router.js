const express = require('express');

const controller = require('../controllers/inicio');

const router = express.Router();

router.get('/', controller.boasVindas);

router.post('/', controller.entrar);

module.exports = router;
