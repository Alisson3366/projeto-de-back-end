const express = require('express');
const usuariosCTRL = require('../controllers/usuarios.controllers');
const middleware = require('../middlewares/validacao');
const router = express.Router();

// ROTAS PÚBLICAS DOS USUÁRIOS (CONTA DE ADMINISTRADOR)
router
	// GET /usuarios/ -> Permite que qualquer pessoa consulte todos os usuários
	.route('/usuarios')
	.get(usuariosCTRL.consultaUsuarios);

router
	// GET /usuarios/:id_U/ -> Permite que qualquer pessoa consulte um usuário específico
	.route('/usuarios/:id')
	.get(middleware.validaIdUsuario, usuariosCTRL.consultaUsuarioIdAdmin);

// ROTAS PRIVADAS RELATIVAS AO PRÓPRIO USUÁRIO
router
	// GET /auth/usuarios/ -> Permite que o usuário logado consulte seus próprios dados
	// PATCH /auth/usuarios/ -> Permite que o usuário logado atualize seus próprios dados
	// DELETE /auth/usuarios/ -> Permite que o usuário logado detele sua própria conta
	.route('/auth/usuarios')
	.get(middleware.validaToken, usuariosCTRL.consultaUsuarioId)
	.patch(middleware.validaToken, usuariosCTRL.atualizaUsuario)
	.delete(middleware.validaToken, usuariosCTRL.deletaUsuario);

module.exports = router;
