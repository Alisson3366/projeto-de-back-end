// const { v4: uuid } = require('uuid');
// const { ObjectID } = require('bson');

const Usuario = require('../models/usuarios.models');
const Anuncio = require('../models/anuncios.models');

// ROTAS PÚBLICAS DOS ANÚNCIOS (CONTA DE ADMINISTRADOR)
async function consultaAnuncios(req, res) {
	await Anuncio.find({})
		.then((anuncios) => {
			return res.status(200).json(anuncios);
		})
		.catch((error) => {
			return res.status(500).json(error);
		});
}

async function consultaAnuncioId(req, res) {
	await Anuncio.findOne({ _id: req.params.id }) //{ _id: ObjectID(req.params.id) }
		.then((anuncio) => {
			if (anuncio) {
				return res.status(200).json(anuncio);
			} else {
				return res.status(404).json('Anúncio não localizado!');
			}
		})
		.catch((error) => {
			return res.status(500).json(error);
		});
}

// ROTAS PRIVADAS RELATIVAS AOS PRÓPRIOS ANÚNCIOS
async function consultaAnunciosUsuario(req, res) {}

async function adicionaAnuncioUsuario(req, res) {
	const novoAnuncio = new Anuncio(req.body);
	await novoAnuncio
		.save()
		.then((document) => {
			return res.status(201).json(document);
		})
		.catch((error) => {
			const msgErro = {};
			Object.values(error.errors).forEach(({ properties }) => {
				msgErro[properties.path] = properties.message;
			});
			return res.status(500).json(msgErro);
		});
}

// function criaAnuncio(req, res) {
// 	const { proprietario, tipo, titulo, raca, sexo, quantidade } = req.body;
// 	let novoAnuncio = {
// 		id: uuid(),
// 		proprietario: String(req.body.proprietario).toLowerCase(),
// 		// Dever ser o usuário logado Ex.: usuario.login
// 		tipo: String(req.body.tipo).toLowerCase(),
// 		titulo: String(req.body.titulo).toUpperCase(),
// 		raca: String(req.body.raca).toLowerCase(),
// 		sexo: String(req.body.sexo).toLowerCase(),
// 		quantidade: Number(req.body.quantidade),
// 	};

// 	if (!proprietario && !tipo && !titulo && !raca && !sexo && !quantidade) {
// 		return res.status(400).json({
// 			Erro: 'Para criar um anúncio informe: proprietario, tipo, titulo, raca, sexo e quantidadede!',
// 		});
// 	}

// 	// Não permite criar um anúncio se o tipo não for adoção ou cruzamento
// 	if (String(req.body.tipo).toLowerCase() != 'adoção' && String(req.body.tipo).toLowerCase() != 'cruzamento') {
// 		return res.status(400).json({
// 			Erro: 'O tipo do anúncio deve dever ser: adoção ou cruzamento.',
// 		});
// 	}

// 	// Atribui uma quantidade caso o tipo do anúncio seja de adoção ou não
// 	novoAnuncio.quantidade = novoAnuncio.tipo === 'adoção' ? Number(req.body.quantidade) : null;

// 	anuncios.push(novoAnuncio);
// 	res.status(201).json({ Mensagem: 'Novo anúncio criado com sucesso!' });
// }

async function atualizaAnuncioUsuario(req, res) {
	await Anuncio.findOneAndUpdate({ _id: ObjectID(req.params.id) }, req.body, {
		runValidators: true,
	})
		.then((anuncio) => {
			if (anuncio) {
				return res.status(200).json('Anúncio atualizado com sucesso!');
			} else {
				return res.status(404).json('Anúncio não encontrado!');
			}
		})
		.catch((error) => {
			const msgErro = {};
			Object.values(error.errors).forEach(({ properties }) => {
				msgErro[properties.path] = properties.message;
			});
			return res.status(500).json(msgErro);
			// status de erro 500 ou 422?
		});
}

// function atualizaAnuncio(req, res) {
// 	let anuncio = anuncios.find((value) => value.id === req.params.id);
// 	const { proprietario, tipo, titulo, raca, sexo, quantidade } = req.body;
// 	// temporariamente "proprietario"
// 	if (!proprietario && !tipo && !titulo && !raca && !sexo && !quantidade) {
// 		return res.status(400).json({
// 			Erro: 'Informe pelo menos uma informação para alterar o anúncio: proprietario, tipo, titulo, raca, sexo ou quantidade!',
// 		});
// 	}

// 	if (proprietario) anuncio.proprietario = String(req.body.proprietario).toLowerCase();
// 	// temporariamente "proprietario"
// 	if (tipo) anuncio.tipo = String(req.body.tipo).toLowerCase();
// 	if (titulo) anuncio.titulo = String(req.body.titulo).toUpperCase();
// 	if (raca) anuncio.raca = String(req.body.raca).toLowerCase();
// 	if (sexo) anuncio.sexo = String(req.body.sexo).toLowerCase();
// 	if (quantidade) anuncio.quantidade = Number(req.body.quantidade);
// 	res.status(200).json({ Mensagem: 'Seu anúncio foi atualizado!' });
// }

async function deletaAnuncioUsuario(req, res) {
	await Anuncio.findOneAndDelete({ _id: ObjectID(req.params.id) }, { runValidators: true })
		.then((anuncio) => {
			if (anuncio) {
				return res.status(200).json('Anúncio deletado com sucesso!');
			} else {
				return res.status(404).json('Anúncio não encontrado!');
			}
		})
		.catch((error) => {
			return res.status(500).json(error);
		});
}

module.exports = {
	consultaAnuncios,
	consultaAnuncioId,
	consultaAnunciosUsuario,
	adicionaAnuncioUsuario,
	atualizaAnuncioUsuario,
	deletaAnuncioUsuario,
};
