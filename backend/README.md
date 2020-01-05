# GYMPOINT - Backend

Gympoint is a Gym manager app. With it you can manage the accounts and information of both users and students.

## About This Project

The application backend is being developed in Node.js and uses `express` as the web framework,`sequelize` for communication with PostgreSQL database and `jsonwebtoken` for user authentication.

Also `bee-queue` is used as a job queue using `Redis` to send emails using `node-mailer`, `handlebars` to configure each email and `Mailtrap` for testing purposes, triggered by certain events wich will be described here.

Feel free to clone this project for anything you want.

### About Me

Email: passos.fe@gmail.com

Connect at [LinkedIn](https://www.linkedin.com/in/passosfe/)

## Table of Contents

1. [Getting Started](#Getting-Started)
2. [Routes](#Routes)

- [POST](#POST)
  - [1. Session Start](#1-Session-Start)
  - [2. Student Creation](#2-Student-Creation)
- [PUT](#PUT)
  - [3. Update Student](#1-Update-Student)
  - [4. Update User](#2-Update-User)

3. [TODO](#TODO)
4. [License](#License)

## Getting Started

### Prerequisites

In order to run this project you must have the following in your computer:

- Node.js v8+
- PostgreSQL (Running on default port 5432)
- Redis (Running on default port 6379)
- Mailtrap account

### Installing

**Cloning the Repository**

```
$ git clone https://github.com/passosfe/gympass-backend

$ cd gympass-backend
```

**Installing dependencies**

```
$ yarn
```

_or_

```
$ npm install
```

## Routes

Base URL: http://localhost:3334/

### Sessions

- **This route is where you can get the token wich is required to access other endpoints in the API.**

All ** CREATION ** and ** MODIFICATION ** requests must be authenticated with a token that is provided after login. To request, a `POST` request must be sent to the address:`http://localhost:3334/sessions`. In the request's body, the following information is expected in JSON format:

```json
{
  "email": "user@email.com",
  "password": "userpassword"
}
```

** PLEASE NOTE: ** All fields in this request are required.

If login is accepted, the response will be as follows:

```json
{
  "user": {
    "id": 7,
    "name": "Username",
    "email": "user@email.com"
  },
  "token": "token"
}
```

The generated token will be requested for all the following `POST` and`PUT` requests.

#### 2. Criação de Alunos

Para criar um `aluno` no banco de dados, deve ser enviada uma requisição do tipo `POST` para o endereço `http://localhost:3334/students`. A requisição deve enviar dentro do bearer token, o token gerado no início de sessão. Dentro do corpo da requisição, são esperados os seguintes parâmetros:

```json
{
  "name": "Name",
  "email": "student@email.com",
  "age": 20,
  "weight": 50.5,
  "height": 150
}
```

**ATENÇÃO:** Todos os campos desta requisição são obrigatórios.

Caso a requsição seja aceita, a resposta conterá os seguintes dados:

```json
{
  "id": 4,
  "name": "Name",
  "email": "student@email.com",
  "age": 20,
  "weight": 50.5,
  "height": 150
}
```

Caso ocorra algum erro com a requisição, verifique na sessão de erros em [erros na criação de alunos](#Criação-de-Alunos).

### PUT

#### 1. Update de Alunos

Para atualizar um `aluno` no banco de dados, deve ser enviada uma requisição do tipo `PUT` para o endereço `http://localhost:3334/students`. A requisição deve enviar dentro do bearer token, o token gerado no início de sessão. Dentro do corpo da requisição, são esperados os seguintes parâmetros:

```json
{
  "name": "Name",
  "email": "student@email.com",
  "new_email": "student@newemail.com",
  "age": 21,
  "weight": 51,
  "height": 152
}
```

**ATENÇÃO:** Apenas o campo de e-mail é obrigatório, para que o aluno seja encontrado no banco de dados. Além deste campo basta enviar os campos que serão atualizados.

Caso a requsição seja aceita, a resposta conterá os seguintes dados:

```json
{
  "id": 4,
  "name": "Name",
  "email": "student@newemail.com",
  "age": 21,
  "weight": 51,
  "height": 152
}
```

Caso ocorra algum erro com a requisição, verifique na sessão de [erros na atualização de alunos](#Update-de-Alunos).

#### 2. Update de Usuários

Para atualizar um `usuário` no banco de dados, deve ser enviada uma requisição do tipo `PUT` para o endereço `http://localhost:3334/users`. A requisição deve enviar dentro do bearer token, o token gerado no início de sessão. O token providenciado irá identificar o usuário que será modificado. Dentro do corpo da requisição, são esperados os seguintes parâmetros:

```json
{
  "name": "Username",
  "email": "user@newemail.com",
  "oldPassword": "123456",
  "password": "1234567",
  "confirmPassword": "1234567"
}
```

**ATENÇÃO:** Nenhum campo é obrigatório. O e-mail só será necessário caso o usuário deseje atualizar seu e-mail cadastrado, não sendo necessário enviar o e-mail antigo. Caso deseje modificar a senha, o campo `"oldPassword"` é obrigatório e deve conter a senha atualmente utilizada pelo usuário, o campo`"password"` será a nova senha do usuário e a nova senha deve conter no mínimo **6 dígitos** e o campo `"confirmPassword"` deve conter a mesma senha inserida no campo `"password"` para confirmação da senha.

Caso a requsição seja aceita, a resposta conterá os seguintes dados:

```json
{
  "id": 7,
  "name": "Username",
  "user_email": "user@email.com"
}
```

Caso ocorra algum erro com a requisição, verifique na sessão de [erros na atualização de usuários](#Update-de-Usuários).

## Models

## Possíveis Erros

#### Início de Sessão

- `"Validation failed"`

Este erro ocorre quando o corpo da requisição contém algum erro, verifique se todos os campos nessessários estão presentes e se estão preenchidos corretamente.

- `"User does not exist"`

Este erro ocorre quando o email de usuário no corpo da requisição não pode ser encotrado no banco de usuários cadastrados. Verifique se o email está correto e tente novamente.

- `"Wrong Password"`

Este erro ocorre quando a senha enviada no corpo da requisição não corresponde à senha cadastrada ao usuário. Verifique se a senha está correta e tente novamente.

#### Criação de Alunos

- `"Validation failed"`

Este erro ocorre quando o corpo da requisição contém algum erro, verifique se todos os campos nessessários estão presentes e se estão preenchidos corretamente.

- `"Student already exists"`

Este erro ocorre quando o e-mail que está sendo enviado para inserção já se encontra no banco de dados dos alunos. Possivelmente o `aluno` já existe ou outro `aluno` já está cadastrado usando este e-mail. Verifique o e-mail e tente novamente.

#### Update de Alunos

- `"Validation failed"`

Este erro ocorre quando o corpo da requisição contém algum erro, verifique se todos os campos nessessários estão presentes e se estão preenchidos corretamente.

- `User email not found`

Este erro ocorre quando o e-mail enviado para encontrar o `aluno` a ser atualizado, não corresponde a nenhum `aluno` cadastrado. Verifique se o e-mail está correto e tente novamente.

- `'E-mail already exists'`

Este erro ocorre quando o novo e-mail do `aluno` a ser atualizado, já corresponde ao e-mail de outro `aluno` já cadastrado. Utilize outro e-mail para atualizar.

#### Update de Usuários

- `"Validation failed"`

Este erro ocorre quando o corpo da requisição contém algum erro, verifique se todos os campos nessessários estão presentes e se estão preenchidos corretamente.

- `'E-mail already exists'`

Este erro ocorre quando o novo e-mail do `usuário` a ser atualizado, já corresponde ao e-mail de outro `usuário` já cadastrado. Utilize outro e-mail para atualizar.

## Contributing

## Built With

- [NodeJS](https://nodejs.org/en/) - Server
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Hash generator
- [sequelize](https://sequelize.org/) - ORM for Postgres
- [yup](https://github.com/jquense/yup) - Object schema validator
- [express](https://expressjs.com/) - Router
- [sucrase](https://github.com/alangpierce/sucrase) - Transpiling
- [nodemon](https://nodemon.io/) - Process Manager used in the development
- [dotenv](https://github.com/motdotla/dotenv) - Environment loader
- [eslint](https://eslint.org/) - JS Linter and code style
- [prettier](https://github.com/prettier/prettier) - Code formatter
- [bee-queue](https://bee-queue.com/) - Redis-backed job queue for Node.js
- [date-fns](https://date-fns.org/) - Date utility
- [express-handlebars](https://www.npmjs.com/package/express-handlebars) - Handlebars view engine for Express
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - JSON Web Tokens
- [nodemailer](https://nodemailer.com/about/) - Email sending
- [nodemailer-express-handlebars](https://github.com/yads/nodemailer-express-handlebars) - Plugin for Nodemailer
- [pg](https://github.com/brianc/node-postgres) - PostgreSQL client for Node.js
- [pg-hstore](https://github.com/scarney81/pg-hstore) - Serializing and deserializing JSON data to hstore format

## License

Este projeto é licencisado sob a licença MIT.
