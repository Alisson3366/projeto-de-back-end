const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');
const usuariosModels = require('../models/usuarios.models');
const Usuario = require('../models/usuarios.models');

const anuncioSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
			required: true,
			immutable: true,
			default: uuid(),
		},
		donoAnuncio: {
			type: mongoose.Schema.Types.String,
			ref: 'Usuario',
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
			required: false,
			// required: () => {
			// 	return this.tipo === 'adoção';
			// 	// Se o tipo for adoção, então a quantidade será obrigatória.
			// },
			min: 1,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Anuncio', anuncioSchema);
