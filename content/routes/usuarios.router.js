const express = require('express');
const controller = require('../controllers/usuarios.controllers');
const middleware = require('../middlewares/validacao');
const router = express.Router();

// Rotas Públicas
router.route('/usuarios').get(controller.consultaUsuarios).post(controller.criaUsuario);

// Rotas Privadas
router
	.route('/usuarios/:id')
	.get(middleware.validaToken, middleware.validaIdUsuario, controller.consultaUsuarioId)
	.patch(middleware.validaToken, middleware.validaIdUsuario, controller.atualizaUsuario)
	.delete(middleware.validaToken, middleware.validaIdUsuario, controller.deletaUsuario);

// ROTAS PRIVADAS RELATIVAS AO PRÓPRIO USUÁRIO
// GET /usuarios/:id_U -> Permite que o usuário logado consulte seus próprios dados
// PATCH /usuarios/:id_U -> Permite que o usuário logado atualize seus próprios dados
// DELETE /usuarios/:id_U -> Permite que o usuário logado detele sua própria conta

// ROTAS PRIVADAS RELATIVAS AOS PRÓPRIOS ANÚNCIOS
// GET /usuarios/:id_U/anuncios/ -> Permite que o usuário logado consulte seus próprios anúncios
// POST /usuarios/:id_U/anuncios/ -> Permite que o usuário logado crie um novo anúncio
// PATCH /usuarios/:id_U/anuncios/:id_A -> Permite que o usuário logado atualize um de seus anúncios
// DELETE /usuarios/:id_U/anuncios/:id_A -> Permite que o usuário logado detele um de seus anúncios

// ROTAS PRIVADAS RELATIVAS AOS PRÓPRIOS PETS
// GET /usuarios/:id_U/pets/ -> Permite que o usuário logado consulte seus próprios pets
// POST /usuarios/:id_U/pets/ -> Permite que o usuário logado crie um novo pets
// PATCH /usuarios/:id_U/pets/:id_P -> Permite que o usuário logado atualize um de seus pets
// DELETE /usuarios/:id_U/pets/:id_P -> Permite que o usuário logado detele um de seus pets

// ROTAS PÚBLICAS GERAIS
// GET /anuncios/ -> Permite que qualquer pessoa consulte todos os anúncios
// GET /anuncios/:id -> Permite que qualquer pessoa consulte um anúncio específico

// DÚVIDA: Como saber se um usuário está logado?
// DÚVIDA: Isso deve influenciar no caminho das rotas ou apenas nos headers das requisições?

module.exports = router;
