const express = require('express');
const anunciosCTRL = require('../controllers/anuncios.controllers');
const middleware = require('../middlewares/validacao');
const router = express.Router();

// ROTAS PÚBLICAS DOS ANÚNCIOS (CONTA DE ADMINISTRADOR)
router
	// GET /anuncios/ -> Permite que qualquer pessoa consulte todos os anúncios
	.route('/anuncios')
	.get(anunciosCTRL.consultaAnuncios);

router
	// GET /anuncios/:id_A/ -> Permite que qualquer pessoa consulte um anúncio específico
	.route('/anuncios/:id')
	.get(middleware.validaIdAnuncio, anunciosCTRL.consultaAnuncioId);

// ROTAS PRIVADAS RELATIVAS AOS PRÓPRIOS ANÚNCIOS
router
	// GET /auth/anuncios/ -> Permite que o usuário logado consulte seus próprios anúncios
	// POST /auth/anuncios/ -> Permite que o usuário logado adicione um novo anúncio
	.route('/auth/anuncios')
	.get(middleware.validaToken, anunciosCTRL.consultaAnunciosUsuario)
	.post(middleware.validaToken, anunciosCTRL.adicionaAnuncioUsuario);

router
	// PATCH /auth/anuncios/:id_A/ -> Permite que o usuário logado atualize um de seus anúncios
	// DELETE /auth/anuncios/:id_A/ -> Permite que o usuário logado detele um de seus anúncios
	.route('/auth/anuncios/:id')
	.patch(middleware.validaToken, middleware.validaIdAnuncio, anunciosCTRL.atualizaAnuncioUsuario)
	.delete(middleware.validaToken, middleware.validaIdAnuncio, anunciosCTRL.deletaAnuncioUsuario);

module.exports = router;
