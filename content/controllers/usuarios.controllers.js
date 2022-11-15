const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarios.models');

async function consultaUsuarios(req, res) {
	await Usuario.find({})
		.then((usuarios) => {
			return res.status(200).json(usuarios);
		})
		.catch((error) => {
			return res.status(500).json({ Erro: 'Erro interno na aplicação!' });
		});
}

async function consultaUsuarioId(req, res) {
	if (req.params.id !== req.cookies.idUsuario) {
		return res.status(404).json({ Erro: 'O ID informado é diferente do usuário logado!' });
	} else {
		await Usuario.findOne({ _id: req.cookies.idUsuario })
			// .select('+senha')
			.then((usuario) => {
				if (usuario) {
					return res.status(200).json(usuario);
				} else {
					return res.status(404).json({ Erro: 'Usuário não localizado!' });
				}
			})
			.catch((error) => {
				return res.status(500).json({ Erro: 'Erro interno na aplicação!' });
			});
	}
}

async function atualizaUsuario(req, res) {
	const { email, senha, nome } = req.body;

	if (!email && !senha && !nome) {
		return res.status(400).json({
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

	await Usuario.findOneAndUpdate({ _id: req.params.id }, novoUsuario, { runValidators: true })
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
	await Usuario.deleteOne({ _id: req.params.id })
		.then((documento) => {
			if (documento) {
				return res.status(200).json({ Mensagem: 'Usuário deletado com sucesso!' });
				// return res.redirect('/');
			} else {
				return res.status(404).json({ Erro: 'Usuário não localizado!' });
			}
		})
		.catch((error) => {
			return res.status(500).json({ Erro: 'Erro interno na aplicação!' });
		});
}

// ErrorCaptureStackTrace(err)
// Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client

module.exports = {
	consultaUsuarios,
	consultaUsuarioId,
	atualizaUsuario,
	deletaUsuario,
};
