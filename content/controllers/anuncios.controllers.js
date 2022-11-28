const Usuario = require('../models/usuarios.models');
const Anuncio = require('../models/anuncios.models');
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');
const logger = require('../middlewares/logger');

// ROTAS PÚBLICAS DOS ANÚNCIOS (CONTA DE ADMINISTRADOR)
const consultaAnuncios = async (req, res) => {
	await Anuncio.find({})
		.then((anuncios) => {
			return res.status(200).json(anuncios);
		})
		.catch((error) => {
			logger(error);
			return res.status(500).json({ Erro: 'Erro interno na aplicação!' });
		});
};

const consultaAnuncioId = async (req, res) => {
	await Anuncio.findOne({ _id: req.params.id })
		.then((anuncio) => {
			if (anuncio) {
				return res.status(200).json(anuncio);
			} else {
				return res.status(404).json({ Mensagem: 'Anúncio não localizado!' });
			}
		})
		.catch((error) => {
			logger(error);
			return res.status(500).json({ Erro: 'Erro interno na aplicação!' });
		});
};

// ROTAS PRIVADAS RELATIVAS AOS PRÓPRIOS ANÚNCIOS
const consultaAnunciosUsuario = async (req, res) => {
	const token = req.cookies.tokenUsuario;
	const segredo = process.env.SEGREDO;
	const payload = jwt.verify(token, segredo);
	await Usuario.findOne({ _id: payload.id })
		.populate('anuncios')
		.then((usuario) => {
			if (usuario) {
				return res.status(200).json(usuario.$getPopulatedDocs());
			} else {
				return res.status(404).json({ Erro: 'Usuário não localizado!' });
			}
		})
		.catch((error) => {
			logger(error);
			return res.status(500).json({ Erro: 'Erro interno na aplicação!' });
		});
};

const adicionaAnuncioUsuario = async (req, res) => {
	const { tipo, titulo, sexo, raca, quantidade } = req.body;

	// Verificação para criação de um novo anúncio
	if (!tipo || !titulo || !sexo) {
		return res.status(422).json({
			Erro: 'Para criar um anúncio informe: tipo, titulo e sexo, raca e quantidadede são opcionais!',
		});
	}

	// Não permite criar um anúncio se o tipo não for adoção ou cruzamento
	if (String(req.body.tipo).toLowerCase() != 'adoção' && String(req.body.tipo).toLowerCase() != 'cruzamento') {
		return res.status(422).json({
			Erro: 'O tipo do anúncio deve ser: adoção ou cruzamento!',
		});
	}

	const token = req.cookies.tokenUsuario;
	const segredo = process.env.SEGREDO;
	const payload = jwt.verify(token, segredo);

	const novoAnuncio = {
		_id: uuid(),
		tipo,
		titulo,
		sexo,
		raca,
		quantidade,
		donoAnuncio: payload.id,
	};
	const novoUsuario = await Usuario.findOne({ _id: payload.id });

	await new Anuncio(novoAnuncio)
		.save()
		.then((documento) => {
			novoUsuario.anuncios.push(documento);
			novoUsuario.save();
			return res.status(201).json({ Mensagem: 'Anúncio adicionado com sucesso!' });
		})
		.catch((error) => {
			const msgErro = {};
			if (error.errors) {
				Object.values(error.errors).forEach(({ properties }) => {
					msgErro[properties.path] = properties.message;
				});
				return res.status(500).json(msgErro);
			}
			logger(error);
			return res.status(422).json(msgErro);
		});
};

const atualizaAnuncioUsuario = async (req, res) => {
	const { tipo, titulo, sexo, raca, quantidade } = req.body;

	// Verificação para atualização de um anúncio
	if (!tipo && !titulo && !sexo && !raca && !quantidade) {
		return res.status(422).json({
			Erro: 'Informe pelo menos uma informação para alterar o anúncio: tipo, titulo, sexo, raca ou quantidadede!',
		});
	}

	// Não permite atualizar o anúncio se o tipo não for adoção ou cruzamento
	if (String(req.body.tipo).toLowerCase() != 'adoção' && String(req.body.tipo).toLowerCase() != 'cruzamento') {
		return res.status(422).json({
			Erro: 'O tipo do anúncio deve ser: adoção ou cruzamento!',
		});
	}

	const novoAnuncio = { tipo, titulo, sexo, raca, quantidade };

	await Anuncio.findOneAndUpdate({ _id: req.params.id }, novoAnuncio, { runValidators: true })
		.then((documento) => {
			if (documento) {
				return res.status(200).json({ Mensagem: 'Anúncio atualizado com sucesso!' });
			} else {
				return res.status(404).json({ Erro: 'Anúncio não localizado!' });
			}
		})
		.catch((error) => {
			const msgErro = {};
			Object.values(error.errors).forEach(({ properties }) => {
				msgErro[properties.path] = properties.message;
			});
			logger(error);
			return res.status(500).json(msgErro);
		});
};

const deletaAnuncioUsuario = async (req, res) => {
	const token = req.cookies.tokenUsuario;
	const segredo = process.env.SEGREDO;
	const payload = jwt.verify(token, segredo);
	const novoUsuario = await Usuario.findOne({ _id: payload.id });
	const posicao = novoUsuario.anuncios.indexOf(String(req.params.id));
	novoUsuario.anuncios.splice(posicao, 1);
	novoUsuario.save();

	await Anuncio.findOneAndDelete({ _id: req.params.id })
		.then((documento) => {
			if (documento) {
				return res.status(200).json({ Mensagem: 'Anúncio deletado com sucesso!' });
			} else {
				return res.status(404).json({ Erro: 'Anúncio não localizado!' });
			}
		})
		.catch((error) => {
			logger(error);
			return res.status(500).json({ Erro: 'Erro interno na aplicação!' });
		});
};

module.exports = {
	consultaAnuncios,
	consultaAnuncioId,
	consultaAnunciosUsuario,
	adicionaAnuncioUsuario,
	atualizaAnuncioUsuario,
	deletaAnuncioUsuario,
};
