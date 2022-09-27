const express = require('express');

const controller = require('../controllers/anuncios');
const middleware = require('../middlewares/validacao');

const router = express.Router();

router.get('/', controller.consultaAnuncios);

router.get('/:id', middleware.validaIdAnuncio, controller.consultaAnuncioId);

router.post('/', controller.criaAnuncio);

router.patch('/:id', middleware.validaIdAnuncio, controller.atualizaAnuncio);

router.delete('/:id', middleware.validaIdAnuncio, controller.deletaAnuncio);

module.exports = router;
