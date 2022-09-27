# Projeto de Back-End

> Repositório reservado para a criação do Projeto Integrado de Back-End dos alunos do 3º semestre de Análise e Desenvolvimento de Sistemas.

## Meu amigo PET (Sobre a API)

> A API encontra-se em desenvolvimento, portanto os arquivos neste repositório estão em constante mudança.

**Meu amigo PET** é uma **API REST** cujo objetivo principal é conectar usuários, sejam eles pais de PETs ou aspirantes ao cargo, com objetivos semelhantes: adoção ou cruzamento.

A conexão entre usuários se dá por meio de anúncios, os quais podem ser de adoção ou cruzamento. Assim, usuários logados podem acessar o "feed de anúnicos" e obter informações e dados de contato com outros usuários.

A API visa atender usuários comuns e administradores da API com funcionalidades diferentes para cada um dos tipos de contas.

Os usuários devem estar logados no servidor para acessar as diferentes rotas e suas funcionalidades.

A aplicação foi construida usando-se Node.JS, módulos NPM (específicados no arquivo **package.json**), o framework Express e o [GitHub](https://github.com/Alisson3366/projeto-de-back-end).

> A parte de autenticação de usuários e o controle de rotas ainda não foi implementado, portanto todas as rotas estão disponíveis, como se estivessem sendo acessadas por usuários administradores.

-   Funcionalidade para usuários comuns:
    -   consultar todos os anúncios,
    -   consultar anuncios específicos pelo id,
    -   criar seus anúncios e sua própria conta de usuário,
    -   inserir em sua conta novos PETs,
    -   atualizar seus anúncios e sua própria conta de usuário,
    -   atualizar informações de seus PETs pelo id,
    -   deletar seus anúncios e sua própria conta de usuário,
    -   deletar seus PETs.
-   Funcionalidade para administradores:
    -   consultar todos os anúncios, usuários e seus PETs,
    -   consultar anuncios e usuários específicos pelo id,
    -   criar anúncios e novos usuários administradores,
    -   atualizar anúncios e usuários,
    -   deletar anúncios e usuários.

### Colaboradores:

-   Alisson Silva dos Santos
-   Henrique dos Santos Alves
-   Pedro Henrique da Silveira Rocha

### Requisitos:

-   Deve permitir o login e o logout dos usuários
-   Deve permitir o cadastramento e o descadastramento de usuários
-   Deve permitir que os usuários criem anuncios de adoção e intenção de cruza
-   Deve permitir que todos os usuários logadas vizualizem o feed de anuncios já criados

-   Criar o módulo de login
-   Definir o proprietário de um novo anúncio conforme o usuário logado
