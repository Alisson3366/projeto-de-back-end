const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

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
			required: true,
			immutable: true,
		},
		nome: {
			type: String,
			required: [true, 'O nome do pet é obrigatório!'],
			trim: true,
			uppercase: true,
		},
		sexo: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			enum: {
				values: ['fêmea', 'macho'],
				message: 'O sexo do pet deve ser: fêmea ou macho!',
			},
		},
		raca: {
			type: String,
			required: [false, 'A raça do pet é obrigatória!'],
			trim: true,
			lowercase: true,
			default: 'srd',
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Pet', petSchema);
