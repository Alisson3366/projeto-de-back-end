const { v4: uuid } = require('uuid');
// const { ObjectID } = require('bson');

// const usuariosDados = require('../models/usuarios.json');
// const usuarios = usuariosDados.usuarios;

const Usuario = require('../models/usuarios.models');

async function verificarLoginUsuario(login) {
	await Usuario.findOne({ login: login }).then(
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

// function consultaUsuarios(req, res) {
// 	res.status(200).json(usuarios);
// }

async function consultaUsuarios(req, res) {
	await Usuario.find({})
		.then((usuarios) => {
			return res.status(200).json(usuarios);
		})
		.catch((error) => {
			return res.status(500).json(error);
		});
}

// function consultaUsuarioId(req, res) {
// 	let usuario = usuarios.find((value) => value.id === req.params.id);
// 	res.status(200).json(usuario);
// }

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

// function criaUsuario(req, res) {
// 	const { login, senha, nome } = req.body;
// 	let novoUsuario = {
// 		id: uuid(),
// 		login: String(req.body.login).toLowerCase(),
// 		senha: String(req.body.senha).toLowerCase(),
// 		nome: String(req.body.nome).toUpperCase(),
// 		temPet: false,
// 		pets: [],
// 	};

// 	if (!login || !senha || !nome) {
// 		return res.status(400).json({
// 			Erro: 'Para criar um usuario informe: login, senha e nome!',
// 		});
// 	}

// 	// Funcionalidade que verifica se um login e senha já existem
// 	for (conta of usuarios) {
// 		if (login === conta.login) {
// 			return res.status(400).json({
// 				Erro: 'O login informado já existe. Tente outro!',
// 			});
// 		}
// 	}

// 	usuarios.push(novoUsuario);
// 	res.status(201).json({ Mensagem: 'Novo usuário criado com sucesso!' });
// }

async function criaUsuario(req, res) {
	const { login, senha, nome } = req.body;
	let novoUsuario = {
		login: String(req.body.login).toLowerCase(),
		senha: String(req.body.senha).toLowerCase(),
		nome: String(req.body.nome).toUpperCase(),
	};

	// Verificação para criação de um novo usuário
	if (!login || !senha || !nome) {
		return res.status(400).json({
			Erro: 'Para criar um usuario informe: login, senha e nome!',
		});
	}

	// Funcionalidade que verifica se um login e senha já existem
	await Usuario.findOne({ login: login }).then((usuario) => {
		if (usuario) {
			console.log('Bosta'); //tá entrando aqui
			return res.status(400).json({
				Erro: 'O login informado já existe. Tente outro!',
			});
		} else {
			console.log('Merda');
			return (novoUsuario = new Usuario(novoUsuario));
		}
	});

	await novoUsuario
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
}

// function atualizaUsuario(req, res) {
// 	let usuario = usuarios.find((value) => value.id === req.params.id);
// 	const { login, senha, nome } = req.body;
// 	if (!login && !senha && !nome) {
// 		return res.status(400).json({
// 			Erro: 'Informe pelo menos uma informação para alterar o usuário: login, senha ou nome!',
// 		});
// 	}

// 	// Funcionalidade que verifica se um login já existe
// 	for (let conta of usuarios) {
// 		if (login === conta.login) {
// 			return res.status(400).json({
// 				Erro: 'O login informado já existe. Tente outro!',
// 			});
// 		}
// 	}

// 	if (login) usuario.login = String(req.body.login).toLowerCase();
// 	if (senha) usuario.senha = String(req.body.senha).toLowerCase();
// 	if (nome) usuario.nome = String(req.body.nome).toLowerCase();
// 	res.status(200).json({ Mensagem: 'O usuário foi atualizado!' });
// }

async function atualizaUsuario(req, res) {
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

// function deletaUsuario(req, res) {
// 	let posicao = usuarios.findIndex((value) => value.id === req.params.id);
// 	usuarios.splice(posicao, 1);
// 	res.status(200).json({ Mensagem: 'O usuário foi deletado com sucesso!' });
// }

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
