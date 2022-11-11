const express = require('express');
const petsCTRL = require('../controllers/pets.controller');
const middleware = require('../middlewares/validacao');
const router = express.Router();

// ROTAS PÚBLICAS DOS PETS (CONTA DE ADMINISTRADOR)
router
	// GET /pet/ -> Permite que qualquer pessoa consulte todos os pets FIXME:
	.route('/pet')
	.get(petsCTRL.consultaPets);

router
	// GET /pet/:id_P -> Permite que qualquer pessoa consulte um pet específico
	.route('/pet/:id')
	.get(middleware.validaIdPet, petsCTRL.consultaPetId);

// ROTAS PRIVADAS RELATIVAS AOS PRÓPRIOS PETS
router
	// GET /usuarios/pets/ -> Permite que o usuário logado consulte seus próprios pets
	// POST /usuarios/pets/ -> Permite que o usuário logado adicione um novo pet
	.route('/usuarios/pets/')
	.get(middleware.validaToken, petsCTRL.consultaPetsUsuario)
	.post(middleware.validaToken, petsCTRL.adicionaPetUsuario);

router
	// PATCH /usuarios/pets/:id_P -> Permite que o usuário logado atualize um de seus pets
	// DELETE /usuarios/pets/:id_P -> Permite que o usuário logado detele um de seus pets
	.route('/usuarios/pets/:id')
	.patch(middleware.validaToken, middleware.validaIdPet, petsCTRL.atualizaPetUsuario)
	.delete(middleware.validaToken, middleware.validaIdPet, petsCTRL.deletaPetUsuario);

//FIXME: Criar as funções restantes do arquivo pets.controller.js e testa-las

module.exports = router;
