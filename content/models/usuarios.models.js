const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema(
	{
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
			default: false,
		},
		pets: {
			type: Array,
			required: false,
			default: null,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Usuario', usuarioSchema);
