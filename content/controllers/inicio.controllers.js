const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarios.models');

// const usuariosDados = require('../models/usuarios.json');
// const usuarios = usuariosDados.usuarios;

function boasVindas(req, res, next) {
	res.status(200).json({
		Mensagem: `Bem vindos. Esta é a página inicial!\nUtilize o verbo POST nessa mesma rota e informe seu login e senha para fazer login.`,
	});
	next();
}

async function registrar(req, res) {
	const usuario = new Usuario(req.body);
	usuario.password = bcrypt.hashSync(usuario.password, 8);
	await usuario
		.save()
		.then((documento) => {
			documento.password = undefined;
			return res.status(201).json(documento);
		})
		.catch((error) => {
			const msg = {};
			if (error.errors) {
				Object.values(error.errors).forEach(({ properties }) => {
					msg[properties.path] = properties.message;
				});
			}
			if (error.code == 11000) {
				msg['erro'] = 'Email já registrado';
			}
			console.log(error);
			return res.status(422).json(msg);
		});
}

async function login(req, res) {
	const { email, password } = req.body;
	await Usuario.find({ email: email })
		.select({ password: -1 })
		.then((documento) => {
			if (!documento) {
				return res.status(404).json({ Erro: 'Usuário não cadastrado!' });
			}
			const autentica = bcrypt.compareSync(password, documento.password);
			if (!autentica) {
				return res.status(400).json({ Erro: 'Senha inválida!' });
			}
			return res.json({ email: email, token: 'a1b2c3' });
		})
		.catch((error) => {
			return res.status(500).json(error);
		});
}

function entrar(req, res) {
	let loginEntrada = req.body.login;
	let senhaEntrada = req.body.senha;

	let usuarioEntrada = usuarios.find((value) => value.login === loginEntrada);

	if (!usuarioEntrada) {
		return res.status(400).json({ Erro: 'Usuário ou senha inválidos!' });
	} else if (usuarioEntrada.login === loginEntrada && usuarioEntrada.senha === senhaEntrada) {
		return res.status(200).json({ Mensagem: 'Login efetuado com sucesso!' });
	} else {
		return res.status(400).json({ Erro: 'Usuário ou senha inválidos!' });
	}
}

module.exports = {
	boasVindas,
	entrar,
	registrar,
	login,
};
