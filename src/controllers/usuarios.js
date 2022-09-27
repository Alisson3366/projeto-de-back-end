const { v4: uuid, stringify } = require('uuid');

const usuariosDados = require('../models/usuarios.json');
const usuarios = usuariosDados.usuarios;

function consultaUsuarios(req, res) {
	res.status(200).json(usuarios);
}

function consultaUsuarioId(req, res) {
	let usuario = usuarios.find((value) => value.id === req.params.id);
	res.status(200).json(usuario);
}

function criaUsuario(req, res) {
	const { login, senha, nome } = req.body;
	let novoUsuario = {
		id: uuid(),
		login: String(req.body.login).toLowerCase(),
		senha: String(req.body.senha).toLowerCase(),
		nome: String(req.body.nome).toUpperCase(),
		temPet: false,
		pets: [],
	};

	if (!login || !senha || !nome) {
		return res.status(400).json({
			Erro: 'Para criar um usuario informe: login, senha e nome!',
		});
	}

	// Funcionalidade que verifica se um login e senha já existem
	for (conta of usuarios) {
		if (login === conta.login) {
			return res.status(400).json({
				Erro: 'O login informado já existe. Tente outro!',
			});
		}
	}

	usuarios.push(novoUsuario);
	res.status(201).json({ Mensagem: 'Novo usuário criado com sucesso!' });
}

function atualizaUsuario(req, res) {
	let usuario = usuarios.find((value) => value.id === req.params.id);
	const { login, senha, nome } = req.body;
	if (!login && !senha && !nome) {
		return res.status(400).json({
			Erro: 'Informe pelo menos uma informação para alterar o usuário: login, senha ou nome!',
		});
	}

	// Funcionalidade que verifica se um login já existe
	for (let conta of usuarios) {
		if (login === conta.login) {
			return res.status(400).json({
				Erro: 'O login informado já existe. Tente outro!',
			});
		}
	}

	if (login) usuario.login = String(req.body.login).toLowerCase();
	if (senha) usuario.senha = String(req.body.senha).toLowerCase();
	if (nome) usuario.nome = String(req.body.nome).toLowerCase();
	res.status(200).json({ Mensagem: 'O usuário foi atualizado!' });
}

function deletaUsuario(req, res) {
	let posicao = usuarios.findIndex((value) => value.id === req.params.id);
	usuarios.splice(posicao, 1);
	res.status(200).json({ Mensagem: 'O usuário foi deletado com sucesso!' });
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
