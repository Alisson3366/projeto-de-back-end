const express = require('express');
const controller = require('../controllers/usuarios.controllers');
const middleware = require('../middlewares/validacao');
const router = express.Router();

// Rotas Públicas
router.get('/', controller.consultaUsuarios);
router.post('/', controller.criaUsuario);

// Rotas Privadas
router.get('/:id', middleware.validaToken, middleware.validaIdUsuario, controller.consultaUsuarioId);
router.patch('/:id', middleware.validaToken, middleware.validaIdUsuario, controller.atualizaUsuario);
router.delete('/:id', middleware.validaToken, middleware.validaIdUsuario, controller.deletaUsuario);

module.exports = router;
