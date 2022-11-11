const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');
const usuariosModels = require('../models/usuarios.models');
const Usuario = require('../models/usuarios.models');

const petSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
			required: true,
			immutable: true,
			default: uuid(),
		},
		donoPet: {
			type: mongoose.Schema.Types.String,
			ref: 'Usuario',
		},
		nome: {
			type: String,
			required: [true, 'O nome do pet é obrigatório!'],
			trim: true,
		},
		sexo: {
			type: String,
			required: true,
			trim: true,
			enum: {
				values: ['fêmea', 'macho'],
				message: 'O sexo do pet deve ser: fêmea ou macho!',
			},
		},
		raca: {
			type: String,
			required: [true, 'A raça do pet é obrigatória!'],
			trim: true,
			default: 'SRD',
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Pet', petSchema);
