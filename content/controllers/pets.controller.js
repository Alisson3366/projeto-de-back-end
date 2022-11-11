// const { v4: uuid } = require('uuid');
// const { ObjectID } = require('bson');

const Usuario = require('../models/usuarios.models');
const Pet = require('../models/pets.models');

// ROTAS PÚBLICAS DOS PETS (CONTA DE ADMINISTRADOR)
async function consultaPets(req, res) {}

async function consultaPetId(req, res) {}

// ROTAS PRIVADAS RELATIVAS AOS PRÓPRIOS PETS
async function consultaPetsUsuario(req, res) {}

async function adicionaPetUsuario(req, res) {
	const { nome, sexo, raca } = req.body;

	// Verificação para criação de um novo pet
	if (!nome || !sexo) {
		return res.status(400).json({
			Erro: 'Para adicionar um pet informe pelo menos: nome e sexo!',
		});
	}

	// req.body.id está armazenando o _id do usuário cujo token está acessando as rotas
	const novoPet = { nome, sexo, raca, donoPet: req.body.id };
	await new Pet(novoPet)
		.save()
		.then((documento) => {
			return res
				.status(201)
				.json({ Mensagem: 'Novo pet adicionado com sucesso!', Pet: documento });
		})
		.catch((error) => {
			const msgErro = {};
			if (error.errors) {
				Object.values(error.errors).forEach(({ properties }) => {
					msgErro[properties.path] = properties.message;
				});
				return res.status(500).json(msgErro);
			}
			console.log(error);
			return res.status(422).json(msgErro);
		});

	// await Usuario.findOneAndUpdate({ _id: req.params.id })
	// 	.then((usuario) => {
	// 		if (usuario) {
	// 			// usuario.temPet = true;
	// 			usuario.pets.push(novoPet);
	// 			return res.status(200).json('Pet adicionado ao usuário com sucesso!');
	// 		} else {
	// 			return res.status(404).json('Usuário não encontrado!');
	// 		}
	// 	})
	// 	.catch((error) => {
	// 		const msgErro = {};
	// 		Object.values(error.errors).forEach(({ properties }) => {
	// 			msgErro[properties.path] = properties.message;
	// 		});
	// 		return res.status(500).json(msgErro);
	// 		// status de erro 500 ou 422?
	// 	});
}

async function atualizaPetUsuario(req, res) {}

async function deletaPetUsuario(req, res) {
	await Usuario.findOneAndUpdate({ _id: req.params.id })
		.then((usuario) => {
			if (usuario) {
				if (usuario.temPet != false) {
					let pet = usuario.pets.find((value) => {
						value._id === req.body._id;
					});
					usuario.pets.splice(indexOf(pet), 1);
					return res.status(200).json('Pet deletado do usuário com sucesso!');
				} else {
					return res.status(400).json('O usuário não possui pets!');
				}
			} else {
				return res.status(404).json('Usuário não encontrado!');
			}
		})
		.catch((error) => {
			const msgErro = {};
			Object.values(error.errors).forEach(({ properties }) => {
				msgErro[properties.path] = properties.message;
			});
			return res.status(500).json(msgErro);
			// status de erro 500 ou 422?
		});
}

module.exports = {
	consultaPets,
	consultaPetId,
	consultaPetsUsuario,
	adicionaPetUsuario,
	atualizaPetUsuario,
	deletaPetUsuario,
};
