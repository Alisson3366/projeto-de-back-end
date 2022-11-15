const express = require('express');
const petsCTRL = require('../controllers/pets.controller');
const middleware = require('../middlewares/validacao');
const router = express.Router();

// ROTAS PÚBLICAS DOS PETS (CONTA DE ADMINISTRADOR)
router
	// GET /pets/ -> Permite que qualquer pessoa consulte todos os pets
	.route('/pets')
	.get(petsCTRL.consultaPets);

router
	// GET /pet/:id_P -> Permite que qualquer pessoa consulte um pet específico
	.route('/pet/:id')
	.get(middleware.validaIdPet, petsCTRL.consultaPetId);

// ROTAS PRIVADAS RELATIVAS AOS PRÓPRIOS PETS
router
	// GET /pets/usuario/ -> Permite que o usuário logado consulte seus próprios pets
	// POST /pets/usuario/ -> Permite que o usuário logado adicione um novo pet
	.route('/pets/usuario')
	.get(middleware.validaToken, petsCTRL.consultaPetsUsuario)
	.post(middleware.validaToken, petsCTRL.adicionaPetUsuario);

router
	// PATCH /pet/usuario/:id_P -> Permite que o usuário logado atualize um de seus pets
	// DELETE /pet/usuario/:id_P -> Permite que o usuário logado detele um de seus pets
	.route('/pet/usuario/:id')
	.patch(middleware.validaToken, middleware.validaIdPet, petsCTRL.atualizaPetUsuario)
	.delete(middleware.validaToken, middleware.validaIdPet, petsCTRL.deletaPetUsuario);

module.exports = router;
