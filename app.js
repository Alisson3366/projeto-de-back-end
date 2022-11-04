require('dotenv').config();

// Importação dos módulos NPM
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Instanciamento da aplicação e definição da porta
const app = express();
const porta = 8080;

// Ferramentas necessários para a execução da aplicação
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Declaração dos models utilizados na aplicação (erro -> circular dependencies)

// Declaração das rotas da aplicação
const rotaInicio = require('./content/routes/inicio.router');
const rotaUsuario = require('./content/routes/usuarios.router');
const rotaAnuncio = require('./content/routes/anuncios.router');

// Utilização das rotas
app.use('/', rotaInicio);
app.use('/usuarios', rotaUsuario);
app.use('/anuncios', rotaAnuncio);

// Inicialização da aplicação
mongoose
	.connect(process.env.DATABASE_URL)
	.then(
		console.log('Conexão com o MongoDB estabelecida com sucesso!'),
		app.listen(porta, () => {
			console.log(`Aplicação rodanddo em http://localhost:${porta}`);
		})
	)
	.catch((error) => console.log('A conexão com o MongoDB falhou!', error));

// Exportação de dados e módulos declarados nesse arquivos
module.exports = app;
