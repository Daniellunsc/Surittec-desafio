# Teste surittec.

## Objetivo

O projeto é um crud de cadastro de clientes com os seguintes campos:

- Nome do cliente
- CPF
- Endereço:
   - CEP
   - Logradouro
   - Bairro
   - Cidade 
   - UF
   - Complemento(este opcional)
- Telefone(s):
  - Tipo do número(comercial, residencial ou celular)
  - Número de telefone
- Email(s):
  - Endereço de email

## Tecnologias utilizadas

O projeto é composto por dois projetos e suas respectivas tecnologias:

-   Docker
-   Backend
    -   MySQL(5.6).
    -   Java 8.
    -   Spring.
    -   Hibernate.
    -   Maven.
    -   Autenticação por JWT.
-   Frontend
    -   React.
    -   Redux.
    -   React-Router.
    -   Bootstrap.

O projeto acompanha um script de inicialização do banco de dados junto da pasta ``config``.

## Como iniciar o projeto

Existem duas maneiras de se iniciar o projeto:

- Docker-Compose
  - Para executar via docker-compose, basta estar na pasta raíz do projeto e executar: 
   `` $ docker-compose up ``
  - Obs: é necessário ter o docker instalado.
  - O serviço de backend pode demorar a ser executado pois depende do healthcheck do docker-compose no serviço `db`.
- Instalando as dependências de cada um e iniciando:

  - Configurando banco de dados:
    - É necessário estar executando uma instância do MySQL(5.6 ou 5.7).
    - Recomendado utilizar o docker para executar o banco:
      - `$ docker run -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.6` 
    - Depois de executado o banco, utilizar o script da pasta `config` para a criação das tabelas e população dos dados necessários de login.
  - Iniciando do frontend:
    - `$ cd frontend`
    - `$ npm install`
    - `$ npm start`
    - É necessário ter o Node.js e NPM instalados.

  - Iniciando do backend:
    - Tenha certeza de que você tem um banco de dados MySQL versão 5.6 sendo executada e executou o script da pasta `config`.
    - Tenha certeza de que você possui o `Maven` e o `JDK8` instalados em sua máquina.
    -  `$ cd backend`
    -  `$ mvn spring-boot:run`

Depois de iniciado, o projeto estará diponível no endereço: `http://localhost:8090` para o frontend e `http://localhost:8080` para o backend.


## Utilizando a API sem o frontend.

- O projeto é configurado para ser utilizado pelo frontend, porém caso deseje utilizar somente a api deve-se executar alguns passos devido a autorização JWT requerida.

- Deve-se autenticar no endpoint `/auth` executando uma requisição via `POST` com os seguintes parâmetros de body:
  ```
  {
      "usuario": seu_usuario,
      "senha": sua_senha
  }
  ```
- A resposta se autenticada, será uma chave `token` onde com o valor recebido, poderá ser utilizado para autenticar-se na api.
- Para se autenticar na api, basta incluir o seguinte header:
  ```
    'Authorization': 'Bearer {seu_token}'
  ``` 
- Se autenticado corretamente, a api irá te responder em todas as requisições.
- Se não autenticado corretamente, a api bloqueará a resposta com o statusCode `401`