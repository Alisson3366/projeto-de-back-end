// Importação dos módulos NPM
const express = require('express');
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
const rotaInicio = require('./src/routes/inicio');
const rotaUsuario = require('./src/routes/usuarios');
const rotaAnuncio = require('./src/routes/anuncios');

// Utilização das rotas
app.use('/', rotaInicio);
app.use('/usuarios', rotaUsuario);
app.use('/anuncios', rotaAnuncio);

// Inicialização da aplicação
app.listen(porta, () => {
	console.log(`Aplicação rodanddo em http://localhost:${porta}`);
});

// Exportação de dados e módulos declarados nesse arquivos
module.exports = app;
