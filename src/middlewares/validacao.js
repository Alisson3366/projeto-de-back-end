const { v4: uuid } = require('uuid');
const { validate: isUuid } = require('uuid');

const anunciosDados = require('../models/anuncios.json');
const usuariosDados = require('../models/usuarios.json');
const anuncios = anunciosDados.anuncios;
const usuarios = usuariosDados.usuarios;

function criaId() {
	usuarios.forEach((usuario) => {
		usuario.id = uuid();
	});
	anuncios.forEach((anuncio) => {
		anuncio.id = uuid();
	});
}

criaId();

function validaIdUsuario(req, res, next) {
	const index = req.params.id;

	if (!isUuid(index)) {
		return res.status(400).json({ Erro: 'ID inválido!' });
	}

	try {
		const itemUsuario = usuarios.find((value) => value.id === index);
		res.usuario = itemUsuario;
		if (!itemUsuario) {
			return res.status(404).json({ Erro: 'ID não encontrado!' });
		}
	} catch (erro) {
		return res.status(500).json({ Erro: 'Erro interno na aplicação!' });
	}

	next();
}

function validaIdAnuncio(req, res, next) {
	const index = req.params.id;

	if (!isUuid(index)) {
		return res.status(400).json({ Erro: 'ID inválido!' });
	}

	try {
		const itemAnuncio = anuncios.find((value) => value.id === index);
		res.anuncio = itemAnuncio;
		if (!itemAnuncio) {
			return res.status(404).json({ Erro: 'ID não encontrado!' });
		}
	} catch (erro) {
		return res.status(500).json({ Erro: 'Erro interno na aplicação!' });
	}

	next();
}

module.exports = {
	validaIdUsuario,
	validaIdAnuncio,
	criaId,
};
