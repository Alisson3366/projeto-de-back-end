require('dotenv').config();

// Importação dos módulos NPM
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Instanciamento da aplicação e definição da porta
const app = express();
const porta = process.env.PORTA || 8080;

// Ferramentas necessários para a execução da aplicação
app.use(express.json());
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Para adicionarmos informações no cookie, devemos passar o nome dele junto com seu conteúdo nas respostas
// Exemplo: res.cookie(name_of_cookie, value_of_cookie);

// Declaração dos models utilizados na aplicação (erro -> circular dependencies)

// Declaração das rotas da aplicação
const rotaInicio = require('./content/routes/inicio.router');
const rotaUsuario = require('./content/routes/usuarios.router');
const rotaAnuncio = require('./content/routes/anuncios.router');

// Utilização das rotas
app.use(rotaInicio);
app.use(rotaUsuario);
app.use(rotaAnuncio);

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
