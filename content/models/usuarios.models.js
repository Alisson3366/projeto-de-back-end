const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

const usuarioSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
			required: true,
			immutable: true,
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
