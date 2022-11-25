const Usuario = require('../models/usuarios.models');
const Pet = require('../models/pets.models');
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');
const logger = require('../middlewares/logger');

// ROTAS PÚBLICAS DOS PETS (CONTA DE ADMINISTRADOR)
async function consultaPets(req, res) {
	await Pet.find({})
		.then((pets) => {
			return res.status(200).json(pets);
		})
		.catch((error) => {
			logger(error);
			return res.status(500).json({ Erro: 'Erro interno na aplicação!' });
		});
}

async function consultaPetId(req, res) {
	await Pet.findOne({ _id: req.params.id })
		.then((pets) => {
			if (pets) {
				return res.status(200).json(pets);
			} else {
				return res.status(404).json({ Erro: 'Pet não localizado!' });
			}
		})
		.catch((error) => {
			logger(error);
			return res.status(500).json({ Erro: 'Erro interno na aplicação!' });
		});
}

// ROTAS PRIVADAS RELATIVAS AOS PRÓPRIOS PETS
async function consultaPetsUsuario(req, res) {
	const token = req.cookies.tokenUsuario;
	const segredo = process.env.SEGREDO;
	const payload = jwt.verify(token, segredo);
	await Usuario.findOne({ _id: payload.id })
		.populate('pets')
		.then((usuario) => {
			if (usuario) {
				return res.status(200).json(usuario.$getPopulatedDocs());
			} else {
				return res.status(404).json({ Erro: 'Usuário não localizado!' });
			}
		})
		.catch((error) => {
			logger(error);
			return res.status(500).json({ Erro: 'Erro interno na aplicação!' });
		});
}

async function adicionaPetUsuario(req, res) {
	const { nome, sexo, raca } = req.body;

	// Verificação para criação de um novo pet
	if (!nome || !sexo) {
		return res.status(422).json({
			Erro: 'Para adicionar um pet informe: nome, sexo e raca (opcional)!',
		});
	}

	const token = req.cookies.tokenUsuario;
	const segredo = process.env.SEGREDO;
	const payload = jwt.verify(token, segredo);

	// req.cookies.idUsuario está armazenando o _id do usuário cujo token está acessando as rotas
	const novoPet = { _id: uuid(), nome, sexo, raca, donoPet: payload.id };
	const novoUsuario = await Usuario.findOne({ _id: payload.id });

	await new Pet(novoPet)
		.save()
		.then((documento) => {
			novoUsuario.pets.push(documento);
			novoUsuario.save();
			return res.status(201).json({ Mensagem: 'Pet adicionado com sucesso!' });
		})
		.catch((error) => {
			const msgErro = {};
			if (error.errors) {
				Object.values(error.errors).forEach(({ properties }) => {
					msgErro[properties.path] = properties.message;
				});
				return res.status(500).json(msgErro);
			}
			logger(error);
			return res.status(422).json(msgErro);
		});
}

async function atualizaPetUsuario(req, res) {
	const { nome, sexo, raca } = req.body;

	if (!nome && !sexo && !raca) {
		return res.status(422).json({
			Erro: 'Informe pelo menos uma informação para alterar o pet: nome, sexo ou raça!',
		});
	}

	const novoPet = { nome, sexo, raca };

	await Pet.findOneAndUpdate({ _id: req.params.id }, novoPet, { runValidators: true })
		.then((documento) => {
			if (documento) {
				return res.status(200).json({ Mensagem: 'Pet atualizado com sucesso!' });
			} else {
				return res.status(404).json({ Erro: 'Pet não localizado!' });
			}
		})
		.catch((error) => {
			const msgErro = {};
			Object.values(error.errors).forEach(({ properties }) => {
				msgErro[properties.path] = properties.message;
			});
			logger(error);
			return res.status(500).json(msgErro);
		});
}

async function deletaPetUsuario(req, res) {
	const token = req.cookies.tokenUsuario;
	const segredo = process.env.SEGREDO;
	const payload = jwt.verify(token, segredo);
	const novoUsuario = await Usuario.findOne({ _id: payload.id });
	const posicao = novoUsuario.pets.indexOf(String(req.params.id));
	novoUsuario.pets.splice(posicao, 1);
	novoUsuario.save();

	await Pet.findOneAndDelete({ _id: req.params.id })
		.then((documento) => {
			if (documento) {
				return res.status(200).json({ Mensagem: 'Pet deletado do usuário com sucesso!' });
			} else {
				return res.status(404).json({ Erro: 'Pet não localizado!' });
			}
		})
		.catch((error) => {
			logger(error);
			return res.status(500).json({ Erro: 'Erro interno na aplicação!' });
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
