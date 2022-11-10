// const { v4: uuid } = require('uuid');
const { validate: isUuid } = require('uuid');
const Usuario = require('../models/usuarios.models');
const Anuncio = require('../models/anuncios.models');

// const anunciosDados = require('../models/anuncios.json');
// const usuariosDados = require('../models/usuarios.json');
// const anuncios = anunciosDados.anuncios;
// const usuarios = usuariosDados.usuarios;

// function criaId() {
// 	usuarios.forEach((usuario) => {
// 		usuario.id = uuid();
// 	});
// 	anuncios.forEach((anuncio) => {
// 		anuncio.id = uuid();
// 	});
// }

// criaId();

async function validaIdUsuario(req, res, next) {
	const index = req.params;

	if (!isUuid(index)) {
		return res.status(400).json({ Erro: 'ID inválido!' });
	}

	try {
		const itemUsuario = await Usuario.findById(index);
		res.Usuario = itemUsuario;
		if (!itemUsuario) {
			return res.status(404).json({ Erro: 'ID de usuário não encontrado!' });
		}
	} catch (erro) {
		return res.status(500).json({ Erro: 'Erro interno na aplicação!' });
	}

	next();
}

async function validaIdAnuncio(req, res, next) {
	const index = req.params;

	if (!isUuid(index)) {
		return res.status(400).json({ Erro: 'ID inválido!' });
	}

	try {
		const itemAnuncio = await Anuncio.findById(index);
		res.Anuncio = itemAnuncio;
		if (!itemAnuncio) {
			return res.status(404).json({ Erro: 'ID de anúncio não encontrado!' });
		}
	} catch (erro) {
		return res.status(500).json({ Erro: 'Erro interno na aplicação!' });
	}

	next();
}

async function validaToken() {
	const token = req.headers['authorization'];
	const segredo = process.env.SEGREDO;
	jwt.verify(token, segredo, (error, decoded) => {
		if (error) {
			return res.status(401).json({ Erro: 'Acesso negado!' }).end();
		}
	});
}

module.exports = {
	validaIdUsuario,
	validaIdAnuncio,
	validaToken,
};
