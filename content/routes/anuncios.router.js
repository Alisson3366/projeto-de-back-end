const express = require('express');
const controller = require('../controllers/anuncios.controllers');
const middleware = require('../middlewares/validacao');
const router = express.Router();

// Rotas Públicas
router.get('/', controller.consultaAnuncios);
router.post('/', controller.criaAnuncio);

// Rotas Privadas
router.get('/:id', middleware.validaToken, middleware.validaIdAnuncio, controller.consultaAnuncioId);
router.patch('/:id', middleware.validaToken, middleware.validaIdAnuncio, controller.atualizaAnuncio);
router.delete('/:id', middleware.validaToken, middleware.validaIdAnuncio, controller.deletaAnuncio);

module.exports = router;
