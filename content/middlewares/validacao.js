const { validate: isUuid } = require('uuid');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios.models');
const Anuncio = require('../models/anuncios.models');

async function validaIdUsuario(req, res, next) {
	const index = req.params.id;

	if (!isUuid(index)) {
		return res.status(400).json({ Erro: 'ID inválido!' });
	}

	try {
		const itemUsuario = await Usuario.find({ _id: req.params.id });
		res.usuario = itemUsuario;
		if (!itemUsuario) {
			return res.status(404).json({ Erro: 'ID não encontrado!' });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ Erro: 'Erro interno na aplicação!' });
	}

	next();
}

async function validaIdAnuncio(req, res, next) {
	const index = req.params.id;

	if (!isUuid(index)) {
		return res.status(400).json({ Erro: 'ID inválido!' });
	}

	try {
		const itemAnuncio = await Anuncio.find({ _id: req.params.id });
		// res.anuncio = itemAnuncio;
		if (!itemAnuncio) {
			return res.status(404).json({ Erro: 'ID não encontrado!' });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ Erro: 'Erro interno na aplicação!' });
	}

	next();
}

function validaToken(req, res, next) {
	// const authorization = req.headers['authorization'];
	// O .headers['authorization'] retorna algo assim 'Bearer US$%asd@#$'
	// const token = authorization && authorization.split('')[1];

	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({ Erro: 'Token não informado. Acesso negado!' });
	}

	const [tipo, token] = authorization.split(' ');
	// O tipo recebe 'Bearer' e token recebe o hash ('Bearer US$%asd@#$')

	if (!token) {
		return res.status(401).json({ Erro: 'Token não informado. Acesso negado!' });
	}

	try {
		const segredo = process.env.SEGREDO;

		jwt.verify(token, segredo, (error, documento) => {
			if (error) {
				return res.status(401).json({ Erro: 'Token inválido. Acesso negado!' });
			}
			// req.body.id = documento._id;
		});

		next();
	} catch (error) {
		return res.status(401).json({ Erro: 'Token inválido. Acesso negado!' });
	}
}

module.exports = {
	validaIdUsuario,
	validaIdAnuncio,
	validaToken,
};
