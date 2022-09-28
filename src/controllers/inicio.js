const usuariosDados = require('../models/usuarios.json');
const usuarios = usuariosDados.usuarios;

function boasVindas(req, res, next) {
	res.status(200).json({
		Mensagem: `Bem vindos. Esta é a página inicial!
		Utilize o verbo POST nessa mesma rota e informe seu login e senha no corpo da requisição para fazer login.`,
	});
	next();
}

function entrar(req, res) {
	let loginEntrada = req.body.login;
	let senhaEntrada = req.body.senha;

	let usuarioEntrada = usuarios.find((value) => value.login === loginEntrada);
	//let posicao = usuarios.indexOf(usuarioEntrada);
	// Encontra pra mim no array o elemento cujo valor de login é igual ao passado no corpo da requisição
	console.log(usuarioEntrada);

	if (!usuarioEntrada) {
		return res.status(400).json({ Erro: 'Usuário ou senha inválidos!' });
	} else if (
		usuarioEntrada.login === loginEntrada &&
		usuarioEntrada.senha === senhaEntrada
	) {
		//req.session.login = login;
		return res
			.status(200)
			.json({ Mensagem: 'Login efetuado com sucesso!' });
	} else {
		return res.status(400).json({ Erro: 'Usuário ou senha inválidos!' });
	}
}

module.exports = {
	boasVindas,
	entrar,
};
