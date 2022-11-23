const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

const usuarioSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
			required: true,
			immutable: true,
			// default: uuid(),
		},
		email: {
			type: String,
			required: [true, 'O email é obrigatório!'],
			trim: true,
			lowercase: true,
			unique: true,
		},
		senha: {
			type: String,
			required: [true, 'A senha é obrigatória!'],
			trim: true,
			select: false,
		},
		nome: {
			type: String,
			required: [true, 'O nome é obrigatório!'],
			trim: true,
			uppercase: true,
		},
		pets: [
			{
				type: mongoose.Schema.Types.String,
				ref: 'Pet',
			},
		],
		anuncios: [
			{
				type: mongoose.Schema.Types.String,
				ref: 'Anuncio',
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Usuario', usuarioSchema);

// usuarioSchema.methods.digaOi = function () {
// 	console.log(`Oi, meu nome é ${this.nome}!`);
// };

// usuarioSchema.statics.encontraUsuarioNome = function (nome) {
// 	return this.find({ nome: new RegExp(nome, 'i') });
// 	// utiliza uma expressão regular e o atributo 'i' para aceitar letras maiúsculas e minúsculas
// };

// usuarioSchema.query.porNome = function (nome) {
// 	return this.where({ nome: new RegExp(nome, 'i') });
// 	// cria uma query para utilizar com outros métodos: find, where...
// };

// let user = await Usuario.encontraUsuarioNome().porNome('fulano');
// user = await Usuario.porNome('fulano'); // não funciona, pois não é uma função, apenas uma query

// // MIDDLEWARES
// usuarioSchema.pre('save', function (next) {
// 	this.temPet = false;
// 	next();
// }); //será executado antes de salvar

// usuarioSchema.post('save', function (doc, next) {
// 	doc.digaOi();
// 	next();
// }); //será executado após salvar
