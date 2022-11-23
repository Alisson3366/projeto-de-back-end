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
	.route('/usuario/:id')
	.get(middleware.validaIdUsuario, usuariosCTRL.consultaUsuarioIdAdmin);

// ROTAS PRIVADAS RELATIVAS AO PRÓPRIO USUÁRIO
router
	// GET /usuarios/:id_U/ -> Permite que o usuário logado consulte seus próprios dados
	// PATCH /usuarios/:id_U/ -> Permite que o usuário logado atualize seus próprios dados
	// DELETE /usuarios/:id_U/ -> Permite que o usuário logado detele sua própria conta
	.route('/usuario')
	.get(middleware.validaToken, usuariosCTRL.consultaUsuarioId)
	.patch(middleware.validaToken, usuariosCTRL.atualizaUsuario)
	.delete(middleware.validaToken, usuariosCTRL.deletaUsuario);

module.exports = router;
