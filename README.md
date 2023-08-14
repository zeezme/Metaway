# Controle de Agenda Pessoal - Teste Técnico

Este repositório contém uma aplicação desenvolvida como parte de um teste técnico, cujo objetivo é criar uma ferramenta para controle de agenda pessoal. A aplicação oferece diversas funcionalidades de gerenciamento de contatos, usuários e informações pessoais.

## Documentação da API

A API utilizada no projeto pode ser acessada através do link abaixo:

[Documentação da API](https://demometaway.vps-kinghost.net:8485/swagger-ui/index.html)

<hr/>

# Acesso ao aplicativo: [Acesso ao Aplicativo](http://134.65.237.168/ )

### Certifique-se de que o usuário possui a role ['ROLE_USER']!!

Credenciais de Admin: 

Usuário:  ```admin2``` 

Senha:  ```Brasil@123```

<hr/>

**Observação:** A API é compartilhada e os dados podem sofrer alterações sem aviso prévio. Recomenda-se criar um usuário do tipo Administrador para uso próprio.

## Especificação

A aplicação foi desenvolvida com as seguintes interfaces principais:

### Login

- Formulário para autenticação (usuário/senha)
- Opção para lembrar as credenciais de acesso da aplicação

### Menu de Acessos

- Home
- Meu cadastro
- Usuários (disponível apenas para usuários do tipo Admin)
- Pessoas
- Contatos
- Logout

### Home

- Lista de contatos, diferenciando contatos normais de contatos favoritos
- Pesquisar, remover, incluir, alterar e favoritar contatos
- Exibição de miniatura da foto do cadastro de pessoa

### Meu Cadastro

- Formulário para alterar os dados cadastrais do usuário logado
- Permite alterar todos os dados cadastrais, exceto o tipo de usuário

### Usuários

- Lista de usuários
- Possibilidade de alterar usuários !!O usuário só consegue alterar o próprio usuário
- Formulário para incluir e/ou alterar usuários

### Pessoas

- Lista de pessoas
- Filtragem por termo de pesquisa
- Remoção e edição/alteração de registros
- Exibição de miniatura da imagem/foto
- Formulário para incluir/alterar registros

### Contatos

- Lista de contatos
- Pesquisa, alteração e remoção de registros
- Formulário para incluir/alterar registros



## Adições

- A aplicação foi desenvolvida utilizando React e possui funcionalidades tais como
  - Seleção de um layout específico por rota
  - Sistema de toast e confirmação de ação
  - sistema de rotas dinâmico
  - Sistema de máscara de campo
  - Suporte para submenus com ou sem ícones
  - Suporte a dark mode
  - Configurações da sidebar (possibilidade de adicionar ou remover itens sob demanda)
  - Token de sessionExpiration para controlar o "lembrar de mim"
  - Interface responsiva utilizando bootstrap

## Instruções de Uso

1. Clone este repositório para sua máquina local.
2. Instale as dependências do projeto utilizando o gerenciador de pacotes de sua preferência (npm, yarn, etc.).
3. Execute a aplicação localmente e comece a explorar suas funcionalidades.

Lembre-se de que esta aplicação foi desenvolvida como parte de um teste técnico e pode conter algumas limitações ou áreas de melhoria. Fique à vontade para explorar, testar e fornecer feedback!
