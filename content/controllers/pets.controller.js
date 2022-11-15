const Usuario = require('../models/usuarios.models');
const Pet = require('../models/pets.models');

// ROTAS PÚBLICAS DOS PETS (CONTA DE ADMINISTRADOR)
async function consultaPets(req, res) {
	await Pet.find({})
		.then((pets) => {
			return res.status(200).json(pets);
		})
		.catch((error) => {
			return res.status(500).json({ Erro: 'Erro interno na aplicação!' });
		});
}

async function consultaPetId(req, res) {
	await Pet.findOne({ _id: req.params.id })
		.then((pets) => {
			if (pets) {
				return res.status(200).json(pets);
			} else {
				return res.status(404).json({ Erro: 'Pet não localizado!' });
			}
		})
		.catch((error) => {
			return res.status(500).json({ Erro: 'Erro interno na aplicação!' });
		});
}

// ROTAS PRIVADAS RELATIVAS AOS PRÓPRIOS PETS
async function consultaPetsUsuario(req, res) {
	await Usuario.findOne({ _id: req.cookies.idUsuario })
		.populate('pets')
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

async function adicionaPetUsuario(req, res) {
	const { nome, sexo, raca } = req.body;

	// Verificação para criação de um novo pet
	if (!nome || !sexo) {
		return res.status(400).json({
			Erro: 'Para adicionar um pet informe: nome, sexo e raca (opcional)!',
		});
	}

	// req.cookies.idUsuario está armazenando o _id do usuário cujo token está acessando as rotas
	const novoPet = { nome, sexo, raca, donoPet: req.cookies.idUsuario };
	const novoUsuario = await Usuario.findOne({ _id: req.cookies.idUsuario });

	await new Pet(novoPet)
		.save()
		.then((documento) => {
			novoUsuario.pets.push(documento);
			novoUsuario.save();
			return res.status(201).json({ Mensagem: 'Pet adicionado com sucesso!' });
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

async function atualizaPetUsuario(req, res) {
	const { nome, sexo, raca } = req.body;

	if (!nome && !sexo && !raca) {
		return res.status(400).json({
			Erro: 'Informe pelo menos uma informação para alterar o pet: nome, sexo ou raça!',
		});
	}

	const novoPet = { nome, sexo, raca };

	await Pet.findOneAndUpdate({ _id: req.params.id }, novoPet, { runValidators: true })
		.then((documento) => {
			if (documento) {
				return res.status(200).json({ Mensagem: 'Pet atualizado com sucesso!' });
			} else {
				return res.status(404).json({ Erro: 'Pet não localizado!' });
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

async function deletaPetUsuario(req, res) {
	const novoUsuario = await Usuario.findOne({ _id: req.cookies.idUsuario });
	const posicao = novoUsuario.pets.indexOf(String(req.params.id));
	novoUsuario.pets.splice(posicao, 1);
	novoUsuario.save();

	await Pet.deleteOne({ _id: req.params.id })
		.then((documento) => {
			if (documento) {
				return res.status(200).json({ Mensagem: 'Pet deletado do usuário com sucesso!' });
			} else {
				return res.status(404).json({ Erro: 'Pet não localizado!' });
			}
		})
		.catch((error) => {
			return res.status(500).json({ Erro: 'Erro interno na aplicação!' });
		});
}

module.exports = {
	consultaPets,
	consultaPetId,
	consultaPetsUsuario,
	adicionaPetUsuario,
	atualizaPetUsuario,
	deletaPetUsuario,
};
