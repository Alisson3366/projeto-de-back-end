const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');
const Usuario = require('../models/usuarios.models');

const anuncioSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
			required: true,
			default: uuid(),
		},
		proprietario: {
			type: String,
			required: [true, 'O proprietario do anúncio é obrigatório!'],
			trim: true,
			default: Usuario._id,
		},
		tipo: {
			type: String,
			required: [true, 'O tipo do anúncio é obrigatório!'],
			trim: true,
			enum: {
				values: ['adoção', 'cruzamento'],
				message: 'O tipo deve ser: adoção ou cruzamento!',
			},
		},
		titulo: {
			type: String,
			required: [true, 'O título do anúncio é obrigatório!'],
			trim: true,
		},
		sexo: {
			type: String,
			required: true,
			trim: true,
			enum: {
				values: ['ambos', 'fêmea', 'macho'],
				message: 'O sexo deve ser: ambos, fêmea ou macho!',
			},
		},
		raca: {
			type: String,
			required: [true, 'A raça do animal é obrigatória!'],
			trim: true,
			default: 'SRD',
		},
		quantidade: {
			type: Number,
			required: () => {
				return this.tipo === 'adoção';
				// Se o tipo for adoção, então a quantidade será obrigatória.
			},
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

const anuncioModel = mongoose.model('Anuncio', anuncioSchema);

module.exports = anuncioModel;
