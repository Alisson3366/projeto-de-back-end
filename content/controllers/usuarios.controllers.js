// const { v4: uuid } = require('uuid');
// const { ObjectID } = require('bson');

const Usuario = require('../models/usuarios.models');

async function verificarLoginUsuario(email) {
	await Usuario.findOne({ email: email }).then(
		(usuario) => {
			if (usuario) {
				return true;
			} else {
				return false;
			}
		},
		() => false
	);
}

async function consultaUsuarios(req, res) {
	await Usuario.find({})
		.then((usuarios) => {
			return res.status(200).json(usuarios);
		})
		.catch((error) => {
			return res.status(500).json(error);
		});
}

async function consultaUsuarioId(req, res) {
	await Usuario.findOne({ _id: req.params.id }) // ({ _id: ObjectID(req.params.id) })
		.then((usuario) => {
			if (usuario) {
				return res.status(200).json(usuario);
			} else {
				return res.status(404).json('Usuário não localizado!');
			}
		})
		.catch((error) => {
			return res.status(500).json(error);
		});
}

async function criaUsuario(req, res) {
	const { email, senha, nome } = req.body;
	let novoUsuario = { email, senha, nome };

	// Verificação para criação de um novo usuário
	if (!email || !senha || !nome) {
		return res.status(400).json({
			Erro: 'Para criar um usuario informe: email, senha e nome!',
		});
	}

	// Funcionalidade que verifica se um email e senha já existem
	await Usuario.exists({ email: email }).then((usuario) => {
		// verificar se o await é necessário
		if (usuario) {
			console.log('Bosta');
			return res.status(400).json({
				Erro: 'O email informado já existe. Tente outro!',
			});
		} else {
			console.log('Merda');
			return novoUsuario;
		}
	});
	// .then(async () => {});

	await new Usuario(novoUsuario)
		.save({ runValidators: true })
		.then((document) => {
			return res.status(201).json(document);
		})
		.catch((error) => {
			const msgErro = {};
			Object.values(error.errors).forEach(({ properties }) => {
				msgErro[properties.path] = properties.message;
			});
			return res.status(500).json(msgErro);
		});
	//!!!!!! PROBLEMA método .save() não está sendo reconhecido
	// funciona quando utilizamos await new Usuario
}

// function atualizaUsuario(req, res) {
// 	let usuario = usuarios.find((value) => value.id === req.params.id);
// 	const { email, senha, nome } = req.body;
// 	if (!email && !senha && !nome) {
// 		return res.status(400).json({
// 			Erro: 'Informe pelo menos uma informação para alterar o usuário: email, senha ou nome!',
// 		});
// 	}

// 	// Funcionalidade que verifica se um email já existe
// 	for (let conta of usuarios) {
// 		if (email === conta.email) {
// 			return res.status(400).json({
// 				Erro: 'O email informado já existe. Tente outro!',
// 			});
// 		}
// 	}

// 	if (email) usuario.email = String(req.body.email).toLowerCase();
// 	if (senha) usuario.senha = String(req.body.senha).toLowerCase();
// 	if (nome) usuario.nome = String(req.body.nome).toLowerCase();
// 	res.status(200).json({ Mensagem: 'O usuário foi atualizado!' });
// }

async function atualizaUsuario(req, res) {
	// await Usuario.find().save()
	// Não utilizar uptade
	await Usuario.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true }) // ({ _id: ObjectID(req.params.id) })
		.then((usuario) => {
			if (usuario) {
				return res.status(200).json('Usuário atualizado com sucesso!');
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

async function deletaUsuario(req, res) {
	await Usuario.findOneAndDelete({ _id: req.params.id }, { runValidators: true }) // ({ _id: ObjectID(req.params.id) })
		.then((usuario) => {
			if (usuario) {
				return res.status(200).json('Usuário deletado com sucesso!');
			} else {
				return res.status(404).json('Usuário não encontrado!');
			}
		})
		.catch((error) => {
			return res.status(500).json(error);
		});
}

// {
//     "pets": [
//         {
//             "id": 1,
//             "nome": "July",
//             "sexo": "femea",
//             "raca": "SRD"
//         },
//         {
//             "id": 2,
//             "nome": "Lisa",
//             "sexo": "femea",
//             "raca": "West Highland"
//         }
//     ]
// }

module.exports = {
	consultaUsuarios,
	consultaUsuarioId,
	criaUsuario,
	atualizaUsuario,
	deletaUsuario,
};
