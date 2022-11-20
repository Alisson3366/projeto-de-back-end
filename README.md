# Projeto de Back-End

> Repositório reservado para a criação do Projeto Integrado de Back-End dos alunos do 3º semestre de Análise e Desenvolvimento de Sistemas.

## Meu Amigo PET (Sobre a API)

> A API encontra-se em desenvolvimento, portanto os arquivos neste repositório estão em constante mudança.

**Meu Amigo PET** é uma **API REST** cujo objetivo principal é conectar usuários, sejam eles pais de PETs ou aspirantes ao cargo, com objetivos semelhantes: adoção ou cruzamento.
A conexão entre usuários se dá por meio de anúncios, os quais podem ser de adoção ou cruzamento. Assim, usuários logados podem acessar o "feed de anúnicos" e obter informações de pets e usuários.
A API visa atender usuários comuns e administradores com funcionalidades diferentes para cada um dos tipos de contas.
Os usuários devem estar logados no servidor para acessar as diferentes rotas e suas funcionalidades.
A aplicação foi construida usando-se Node.JS, módulos NPM (específicados no arquivo **package.json**), o framework Express e o [GitHub](https://github.com/Alisson3366/projeto-de-back-end).

> A parte de autenticação de usuários e o controle de rotas ainda não foi implementado, portanto todas as rotas estão disponíveis, como se estivessem sendo acessadas por usuários administradores.

-   Funcionalidade para usuários comuns:
    -   criar uma conta de usuário na aplicação,
    -   consultar todos os anúncios,
    -   consultar anúncios específicos pelo id,
    -   adicionar novos anúncios e pets em sua conta de usuário,
    -   atualizar seus anúncios, seus pets e sua própria conta de usuário,
    -   deletar seus anúncios, seus pets e sua própria conta de usuário.
-   Funcionalidade para administradores:
    -   consultar todos os anúncios, pets e usuários,
    -   consultar anúncios e pets específicos pelo id.

### Colaboradores:

-   Alisson Silva dos Santos - 2214290086
-   Henrique dos Santos Alves - 2124290023
-   Pedro Henrique da Silveira Rocha - 2124290005

### Requisitos:

-   DATABASE_URL = mongodb+srv://<>:<>@thecluster.rf7trvj.mongodb.net/Meu-Amigo-PET?retryWrites=true&w=majority
-   PORTA = 8080
-   SEGREDO = JACAREDECAPACETE
