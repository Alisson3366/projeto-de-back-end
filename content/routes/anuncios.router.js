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
	// GET /anuncio/:id_A/ -> Permite que qualquer pessoa consulte um anúncio específico
	.route('/anuncio/:id')
	.get(middleware.validaIdAnuncio, anunciosCTRL.consultaAnuncioId);

// ROTAS PRIVADAS RELATIVAS AOS PRÓPRIOS ANÚNCIOS
router
	// GET /anuncios/usuario/ -> Permite que o usuário logado consulte seus próprios anúncios
	// POST /anuncios/usuario/ -> Permite que o usuário logado adicione um novo anúncio
	.route('/anuncios/usuario')
	.get(middleware.validaToken, anunciosCTRL.consultaAnunciosUsuario)
	.post(middleware.validaToken, anunciosCTRL.adicionaAnuncioUsuario);

router
	// PATCH /anuncio/usuario/:id_A/ -> Permite que o usuário logado atualize um de seus anúncios
	// DELETE /anuncio/usuario/:id_A/ -> Permite que o usuário logado detele um de seus anúncios
	.route('/anuncio/usuario/:id')
	.patch(middleware.validaToken, middleware.validaIdAnuncio, anunciosCTRL.atualizaAnuncioUsuario)
	.delete(middleware.validaToken, middleware.validaIdAnuncio, anunciosCTRL.deletaAnuncioUsuario);

module.exports = router;
