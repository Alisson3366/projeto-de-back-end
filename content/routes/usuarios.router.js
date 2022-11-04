const express = require('express');

const controller = require('../controllers/usuarios.controllers');
const middleware = require('../middlewares/validacao');

const router = express.Router();

router.get('/', controller.consultaUsuarios);

router.get('/:id', middleware.validaIdUsuario, controller.consultaUsuarioId);

router.post('/', controller.criaUsuario);

router.patch('/:id', middleware.validaIdUsuario, controller.atualizaUsuario);

router.delete('/:id', middleware.validaIdUsuario, controller.deletaUsuario);

module.exports = router;
