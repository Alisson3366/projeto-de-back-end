const { validate: isUuid } = require('uuid');
const jwt = require('jsonwebtoken');

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

function validaToken(req, res, next) {
	// const authorization = req.headers['authorization'];
	// O .headers['authorization'] retorna algo assim 'Bearer US$%asd@#$'
	// const token = authorization && authorization.split('')[1];

	const { authorization } = req.headers;
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
			req.body._id = documento._id;
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
