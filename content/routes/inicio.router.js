const express = require('express');
const inicioCTRL = require('../controllers/inicio.controllers');
const router = express.Router();

router
	// GET / -> Mostra na tela uma mensagem de boas vindas
	.route('/')
	.get(inicioCTRL.boasVindas);

router
	// POST /registro/ -> Permite cadastrar um novo usuário na aplicação
	.route('/registro')
	.post(inicioCTRL.registrar);

router
	// POST /entrar/ -> Permite que um usuário cadastrado entre na aplicação
	.route('/entrar')
	.post(inicioCTRL.entrar);

router
	// GET /sair -> Permite que o usuário logado saia da aplicação
	.route('/sair')
	.get(inicioCTRL.sair);

module.exports = router;
