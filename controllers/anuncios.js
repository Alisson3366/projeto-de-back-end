const { v4: uuid } = require('uuid');

const anunciosDados = require('../models/anuncios.json');
const anuncios = anunciosDados.anuncios;

function consultaAnuncios(req, res) {
	res.status(200).json(anuncios);
}

function consultaAnuncioId(req, res) {
	let anuncio = anuncios.find((value) => value.id === req.params.id);
	res.status(200).json(anuncio);
}

function criaAnuncio(req, res) {
	const { proprietario, tipo, titulo, raca, sexo, quantidade } = req.body;
	let novoAnuncio = {
		id: uuid(),
		proprietario: String(req.body.proprietario).toLowerCase(),
		// Dever ser o usuário logado Ex.: usuario.login
		tipo: String(req.body.tipo).toLowerCase(),
		titulo: String(req.body.titulo).toUpperCase(),
		raca: String(req.body.raca).toLowerCase(),
		sexo: String(req.body.sexo).toLowerCase(),
		quantidade: Number(req.body.quantidade),
	};

	if (!proprietario && !tipo && !titulo && !raca && !sexo && !quantidade) {
		return res.status(400).json({
			Erro: 'Para criar um anúncio informe: proprietario, tipo, titulo, raca, sexo e quantidadede!',
		});
	}

	// Não permite criar um anúncio se o tipo não for adoção ou cruzamento
	if (
		String(req.body.tipo).toLowerCase() != 'adoção' &&
		String(req.body.tipo).toLowerCase() != 'cruzamento'
	) {
		return res.status(400).json({
			Erro: 'O tipo do anúncio deve dever ser: adoção ou cruzamento.',
		});
	}

	// Atribui uma quantidade caso o tipo do anúncio seja de adoção ou não
	novoAnuncio.quantidade =
		novoAnuncio.tipo === 'adoção' ? Number(req.body.quantidade) : null;

	anuncios.push(novoAnuncio);
	res.status(201).json({ Mensagem: 'Novo anúncio criado com sucesso!' });
}

function atualizaAnuncio(req, res) {
	let anuncio = anuncios.find((value) => value.id === req.params.id);
	const { proprietario, tipo, titulo, raca, sexo, quantidade } = req.body;
	// temporariamente "proprietario"
	if (!proprietario && !tipo && !titulo && !raca && !sexo && !quantidade) {
		return res.status(400).json({
			Erro: 'Informe pelo menos uma informação para alterar o anúncio: proprietario, tipo, titulo, raca, sexo ou quantidade!',
		});
	}

	if (proprietario)
		anuncio.proprietario = String(req.body.proprietario).toLowerCase();
	// temporariamente "proprietario"
	if (tipo) anuncio.tipo = String(req.body.tipo).toLowerCase();
	if (titulo) anuncio.titulo = String(req.body.titulo).toUpperCase();
	if (raca) anuncio.raca = String(req.body.raca).toLowerCase();
	if (sexo) anuncio.sexo = String(req.body.sexo).toLowerCase();
	if (quantidade) anuncio.quantidade = Number(req.body.quantidade);
	res.status(200).json({ Mensagem: 'Seu anúncio foi atualizado!' });
}

function deletaAnuncio(req, res) {
	let posicao = anuncios.findIndex((value) => value.id === req.params.id);
	anuncios.splice(posicao, 1);
	res.status(200).json({ Mensagem: 'Seu anuncio foi deletado com sucesso!' });
}

module.exports = {
	consultaAnuncios,
	consultaAnuncioId,
	criaAnuncio,
	atualizaAnuncio,
	deletaAnuncio,
};
