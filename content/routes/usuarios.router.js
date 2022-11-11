const express = require('express');
const usuariosCTRL = require('../controllers/usuarios.controllers');
const middleware = require('../middlewares/validacao');
const router = express.Router();

// ROTAS PÚBLICAS DOS USUÁRIOS (CONTA DE ADMINISTRADOR)
router
	// GET /usuarios/ -> Permite que qualquer pessoa consulte todos os usuários FIXME:
	.route('/usuarios')
	.get(usuariosCTRL.consultaUsuarios);

router
	// GET /usuarios/:id -> Permite que qualquer pessoa consulte um usuário específico
	.route('/usuarios/:id')
	.get(middleware.validaIdUsuario, usuariosCTRL.consultaUsuarioId);

// ROTAS PRIVADAS RELATIVAS AO PRÓPRIO USUÁRIO
router
	// GET /usuarios/:id_U -> Permite que o usuário logado consulte seus próprios dados
	// PATCH /usuarios/:id_U -> Permite que o usuário logado atualize seus próprios dados
	// DELETE /usuarios/:id_U -> Permite que o usuário logado detele sua própria conta
	.route('/usuarios/:id')
	.get(middleware.validaToken, middleware.validaIdUsuario, usuariosCTRL.consultaUsuarioId)
	.patch(middleware.validaToken, middleware.validaIdUsuario, usuariosCTRL.atualizaUsuario)
	.delete(middleware.validaToken, middleware.validaIdUsuario, usuariosCTRL.deletaUsuario);

module.exports = router;
