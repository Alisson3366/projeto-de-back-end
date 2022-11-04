const mongoose = require('mongoose');

const petsSchema = new mongoose.Schema(
	{
		proprietario: {
			// O PET deve estar associado a algum usuário, pelo _id do usuário talvez.
			type: String,
			required: [true, 'O proprietario do anúncio é obrigatório!'],
			trim: true,
		},
		name: {
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

module.exports = mongoose.model('Pet', petsSchema);
