const mongoose = require('mongoose');

const anuncioSchema = new mongoose.Schema(
	{
		proprietario: {
			// Dever ser o usuário logado Ex.: usuario.login.
			type: String,
			required: [true, 'O proprietario do anúncio é obrigatório!'],
			trim: true,
		},
		tipo: {
			type: String,
			required: [true, 'O tipo do anúncio é obrigatório!'],
			trim: true,
			enum: {
				values: ['adoção', 'cruzamento'],
				message: 'O tipo deve ser: "adoção" ou "cruzamento"!',
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
				message: 'O sexo deve ser: "ambos", "fêmea" ou "macho"!',
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
			default: null,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Anuncio', anuncioSchema);
