const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

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
			required: true,
			immutable: true,
		},
		tipo: {
			type: String,
			required: [true, 'O tipo do anúncio é obrigatório!'],
			trim: true,
			lowercase: true,
			enum: {
				values: ['adoção', 'cruzamento'],
				message: 'O tipo do anúncio deve ser: adoção ou cruzamento!',
			},
		},
		titulo: {
			type: String,
			required: [true, 'O título do anúncio é obrigatório!'],
			trim: true,
			uppercase: true,
		},
		sexo: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			enum: {
				values: ['ambos', 'fêmea', 'macho'],
				message: 'O sexo deve ser: fêmea, macho ou ambos (em caso de adoção)!',
			},
		},
		raca: {
			type: String,
			required: false,
			trim: true,
			lowercase: true,
			default: 'srd',
		},
		quantidade: {
			type: Number,
			required: () => {
				return this.tipo === 'adoção';
			},
			min: 1,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Anuncio', anuncioSchema);
