const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

const usuarioSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
			required: true,
			default: uuid(),
		},
		login: {
			type: String,
			required: [true, 'O login é obrigatório!'],
			trim: true,
		},
		senha: {
			type: String,
			required: [true, 'A senha é obrigatória!'],
			trim: true,
		},
		name: {
			type: String,
			required: [true, 'O nome é obrigatório!'],
			trim: true,
		},
		temPet: {
			type: Boolean,
			required: true,
			default: () => {
				return this.pets != false;
			},
		},
		pets: [
			{
				type: mongoose.ObjectId,
				ref: 'Pet',
			},
		],
	},
	{
		timestamps: true,
	}
);

const usuarioModel = mongoose.model('Usuario', usuarioSchema);

module.exports = usuarioModel;
