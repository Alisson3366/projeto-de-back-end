const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios.models');

function boasVindas(req, res, next) {
	res.status(200).json({
		Mensagem: `Bem vindos ao Meu Amigo PET!`,
	});
}

async function registrar(req, res) {
	const { email, senha, nome } = req.body;

	if (!email || !senha || !nome) {
		return res.status(400).json({
			Erro: 'Para criar um usuario informe: email, senha e nome!',
		});
	}

	const validaEmail = await Usuario.exists({ email: email });
	if (validaEmail) {
		return res.status(422).json({
			Erro: 'O email informado já existe. Tente outro!',
		});
	}

	const novoUsuario = { email, senha, nome };
	novoUsuario.senha = bcrypt.hashSync(novoUsuario.senha, 10);

	await new Usuario(novoUsuario)
		.save()
		.then((documento) => {
			documento.senha = undefined;
			return res.status(201).json(documento);
		})
		.catch((error) => {
			const msgErro = {};
			if (error.errors) {
				Object.values(error.errors).forEach(({ properties }) => {
					msgErro[properties.path] = properties.message;
				});
				return res.status(500).json(msgErro);
			}
			// if (error.code == 11000) {
			// 	msgErro['erro'] = 'O email informado já existe. Tente outro!';
			// }
			console.log(error);
			return res.status(422).json(msgErro);
		});
}

async function entrar(req, res) {
	const { email, senha } = req.body;

	if (!email || !senha) {
		return res.status(400).json({
			Erro: 'Para entrar na aplicação informe: email e senha!',
		});
	}

	await Usuario.exists({ email: email })
		.select({ senha: -1 })
		.then((documento) => {
			if (!documento) {
				return res.status(422).json({
					Erro: 'Usuário ou senha inválidos!',
				});
			}

			const autenticacao = bcrypt.compareSync(senha, documento.senha);
			if (!autenticacao) {
				return res.status(422).json({
					Erro: 'Usuário ou senha inválidos!',
				});
			}

			const segredo = process.env.SEGREDO;
			const token = jwt.sign({ id: documento._id }, segredo);
			return res.status(200).json({ Mensagem: 'Autenticação realizada com sucesso!', token });
		})
		.catch((error) => {
			return res.status(500).json({ Erro: 'Algo deu errado com a API', error });
		});
}

module.exports = {
	boasVindas,
	entrar,
	registrar,
};
