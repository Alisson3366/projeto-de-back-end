const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');
const { petSchema } = require('../models/pets.models');

const usuarioSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
			required: true,
			default: uuid(),
		},
		email: {
			type: String,
			required: [true, 'O email é obrigatório!'],
			trim: true,
			unique: true,
		},
		senha: {
			type: String,
			required: [true, 'A senha é obrigatória!'],
			trim: true,
			selected: false,
		},
		nome: {
			type: String,
			required: [true, 'O nome é obrigatório!'],
			trim: true,
		},
		// temPet: {
		// 	type: Boolean,
		// 	required: true,
		// 	enum: {
		// 		values: [true, false],
		// 		message: 'O sexo deve ser: ambos, fêmea ou macho!',
		// 	},
		// 	default: false,
		// },
		pets: [petSchema],
	},
	{
		timestamps: true,
	}
);

const usuarioModel = mongoose.model('Usuario', usuarioSchema);

module.exports = usuarioModel;
