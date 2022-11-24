const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarios.models');
const Anuncio = require('../models/anuncios.models');
const Pet = require('../models/pets.models');
const jwt = require('jsonwebtoken');
const logger = require('../middlewares/logger');

async function consultaUsuarios(req, res) {
	await Usuario.find({})
		.then((usuarios) => {
			return res.status(200).json(usuarios);
		})
		.catch((error) => {
			logger(error)
			return res.status(500).json({ Erro: 'Erro interno na aplicação!' });
		});
}

async function consultaUsuarioIdAdmin(req, res) {
	await Usuario.findOne({ _id: req.params.id })
		.then((usuario) => {
			if (usuario) {
				return res.status(200).json(usuario);
			} else {
				return res.status(404).json({ Erro: 'Usuário não localizado!' });
			}
		})
		.catch((error) => {
			logger(error)
			return res.status(500).json({ Erro: 'Erro interno na aplicação!' });
		});
}

async function consultaUsuarioId(req, res) {
	const token = req.cookies.tokenUsuario;
	const segredo = process.env.SEGREDO;
	const payload = jwt.verify(token, segredo);

	await Usuario.findOne({ _id: payload.id })
		.select('+senha')
		.then((usuario) => {
			if (usuario) {
				return res.status(200).json(usuario);
			} else {
				return res.status(404).json({ Erro: 'Usuário não localizado!' });
			}
		})
		.catch((error) => {
			logger(error)
			return res.status(500).json({ Erro: 'Erro interno na aplicação!' });
		});
}

async function atualizaUsuario(req, res) {
	const token = req.cookies.tokenUsuario;
	const segredo = process.env.SEGREDO;
	const payload = jwt.verify(token, segredo);

	const { email, senha, nome } = req.body;

	if (!email && !senha && !nome) {
		return res.status(422).json({
			Erro: 'Informe pelo menos uma informação para alterar o usuário: email, senha ou nome!',
		});
	}

	const validaEmail = await Usuario.exists({ email: email });
	if (validaEmail) {
		return res.status(422).json({
			Erro: 'O email informado já existe. Tente outro!',
		});
	}

	const novoUsuario = { email, senha, nome };

	if (senha) {
		novoUsuario.senha = bcrypt.hashSync(novoUsuario.senha, 10);
	}

	await Usuario.findOneAndUpdate({ _id: payload.id }, novoUsuario, { runValidators: true })
		.then((documento) => {
			if (documento) {
				return res.status(200).json({ Mensagem: 'Usuário atualizado com sucesso!' });
			} else {
				return res.status(404).json({ Erro: 'Usuário não localizado!' });
			}
		})
		.catch((error) => {
			const msgErro = {};
			Object.values(error.errors).forEach(({ properties }) => {
				msgErro[properties.path] = properties.message;
			});
			return res.status(500).json(msgErro);
		});
}

async function deletaUsuario(req, res) {
	const token = req.cookies.tokenUsuario;
	const segredo = process.env.SEGREDO;
	const payload = jwt.verify(token, segredo);

	await Usuario.findOneAndDelete({ _id: payload.id })
		.then(async (documento) => {
			if (documento) {
				for (let i = 0; i < documento.anuncios.length; i += 1) {
					await Anuncio.deleteOne({ _id: documento.anuncios[i] });
				}
				for (let i = 0; i < documento.pets.length; i += 1) {
					await Pet.deleteOne({ _id: documento.pets[i] });
				}
				return res.status(200).json({ Mensagem: 'Usuário deletado com sucesso!' });
				// return res.redirect('/');
			} else {
				return res.status(404).json({ Erro: 'Usuário não localizado!' });
			}
		})
		.catch((error) => {
			logger(error)
			return res.status(500).json({ Erro: 'Erro interno na aplicação!' });
		});
}

// ErrorCaptureStackTrace(err)
// Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client

module.exports = {
	consultaUsuarios,
	consultaUsuarioIdAdmin,
	consultaUsuarioId,
	atualizaUsuario,
	deletaUsuario,
};
