const express = require('express');
const anunciosCTRL = require('../controllers/anuncios.controllers');
const middleware = require('../middlewares/validacao');
const router = express.Router();

// ROTAS PÚBLICAS DOS ANÚNCIOS (CONTA DE ADMINISTRADOR)
router
	// GET /anuncios/ -> Permite que qualquer pessoa consulte todos os anúncios FIXME:
	.route('/anuncios')
	.get(anunciosCTRL.consultaAnuncios);

router
	// GET /anuncios/:id -> Permite que qualquer pessoa consulte um anúncio específico
	.route('/anuncios/:id')
	.get(middleware.validaIdAnuncio, anunciosCTRL.consultaAnuncioId);

// ROTAS PRIVADAS RELATIVAS AOS PRÓPRIOS ANÚNCIOS
router
	// GET /usuarios/anuncios/ -> Permite que o usuário logado consulte seus próprios anúncios
	// POST /usuarios/anuncios/ -> Permite que o usuário logado adicione um novo anúncio
	.route('/usuarios/anuncios')
	.get(middleware.validaToken, anunciosCTRL)
	.post(middleware.validaToken, anunciosCTRL);

router
	// PATCH /usuarios/anuncios/:id_A -> Permite que o usuário logado atualize um de seus anúncios
	// DELETE /usuarios/anuncios/:id_A -> Permite que o usuário logado detele um de seus anúncios
	.route('/usuarios/anuncios/:id')
	.patch(middleware.validaToken, middleware.validaIdAnuncio, anunciosCTRL)
	.delete(middleware.validaToken, middleware.validaIdAnuncio, anunciosCTRL);

//FIXME: Alterar as funções do arquivo anuncios.controllers.js para se adequar ao usuário logado

module.exports = router;
