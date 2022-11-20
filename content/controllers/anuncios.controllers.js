const Usuario = require('../models/usuarios.models');
const Anuncio = require('../models/anuncios.models');

// ROTAS PÚBLICAS DOS ANÚNCIOS (CONTA DE ADMINISTRADOR)
async function consultaAnuncios(req, res) {
	await Anuncio.find({})
		.then((anuncios) => {
			return res.status(200).json(anuncios);
		})
		.catch((error) => {
			return res.status(500).json({ Erro: 'Erro interno na aplicação!' });
		});
}

async function consultaAnuncioId(req, res) {
	await Anuncio.findOne({ _id: req.params.id })
		.then((anuncio) => {
			if (anuncio) {
				return res.status(200).json(anuncio);
			} else {
				return res.status(404).json({ Mensagem: 'Anúncio não localizado!' });
			}
		})
		.catch((error) => {
			return res.status(500).json({ Erro: 'Erro interno na aplicação!' });
		});
}

// ROTAS PRIVADAS RELATIVAS AOS PRÓPRIOS ANÚNCIOS
async function consultaAnunciosUsuario(req, res) {
	await Usuario.findOne({ _id: req.cookies.idUsuario })
		.populate('anuncios')
		.then((usuario) => {
			if (usuario) {
				return res.status(200).json(usuario.$getPopulatedDocs());
			} else {
				return res.status(404).json({ Erro: 'Usuário não localizado!' });
			}
		})
		.catch((error) => {
			return res.status(500).json({ Erro: 'Erro interno na aplicação!' });
		});
}

async function adicionaAnuncioUsuario(req, res) {
	const { tipo, titulo, sexo, raca, quantidade } = req.body;

	// Verificação para criação de um novo anúncio
	if (!tipo || !titulo || !sexo || !raca) {
		return res.status(422).json({
			Erro: 'Para criar um anúncio informe: tipo, titulo, sexo, raca e quantidadede (opcional)!',
		});
	}

	// Não permite criar um anúncio se o tipo não for adoção ou cruzamento
	if (String(req.body.tipo).toLowerCase() != 'adoção' && String(req.body.tipo).toLowerCase() != 'cruzamento') {
		return res.status(422).json({
			Erro: 'O tipo do anúncio deve ser: adoção ou cruzamento!',
		});
	}

	// req.cookies.idUsuario está armazenando o _id do usuário cujo token está acessando as rotas
	const novoAnuncio = { tipo, titulo, sexo, raca, quantidade, donoAnuncio: req.cookies.idUsuario };
	const novoUsuario = await Usuario.findOne({ _id: req.cookies.idUsuario });

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
			console.log(error);
			return res.status(422).json(msgErro);
		});
}

async function atualizaAnuncioUsuario(req, res) {
	const { tipo, titulo, sexo, raca, quantidade } = req.body;

	// Verificação para criação de um novo anúncio
	if (!tipo && !titulo && !sexo && !raca) {
		return res.status(422).json({
			Erro: 'Informe pelo menos uma informação para alterar o anúncio: tipo, titulo, sexo, raca e quantidadede!',
		});
	}

	// Não permite criar um anúncio se o tipo não for adoção ou cruzamento
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
			return res.status(500).json(msgErro);
		});
}

async function deletaAnuncioUsuario(req, res) {
	const novoUsuario = await Usuario.findOne({ _id: req.cookies.idUsuario });
	const posicao = novoUsuario.pets.indexOf(String(req.params.id));
	novoUsuario.anuncios.splice(posicao, 1);
	novoUsuario.save();

	await Anuncio.deleteOne({ _id: req.params.id })
		.then((documento) => {
			if (documento) {
				return res.status(200).json({ Mensagem: 'Anúncio deletado com sucesso!' });
			} else {
				return res.status(404).json({ Erro: 'Anúncio não localizado!' });
			}
		})
		.catch((error) => {
			return res.status(500).json({ Erro: 'Erro interno na aplicação!' });
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
