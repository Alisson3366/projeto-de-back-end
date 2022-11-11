const express = require('express');
const controller = require('../controllers/anuncios.controllers');
const middleware = require('../middlewares/validacao');
const router = express.Router();

// Rotas Públicas
router.route('/anuncios').get(controller.consultaAnuncios).post(controller.criaAnuncio);

// Rotas Privadas
router
	.route('/anuncios/:id')
	.get(middleware.validaIdAnuncio, controller.consultaAnuncioId)
	.patch(middleware.validaToken, middleware.validaIdAnuncio, controller.atualizaAnuncio)
	.delete(middleware.validaToken, middleware.validaIdAnuncio, controller.deletaAnuncio);

module.exports = router;
