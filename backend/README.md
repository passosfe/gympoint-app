<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src="../mobile/src/assets/logo@3x.png" width="200px" />
</h1>

<h3 align="center">
  Gympoint
</h3>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/passosfe/gympoint-app?color=%2304D361">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/passosfe/gympoint-app/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/passosfe/gympoint-app?style=social">
  </a>
  </a>
</p>

# About This Project

The application backend is developed in Node.js and uses `express` as the web framework,`sequelize` for communication with PostgreSQL database and `jsonwebtoken` for user authentication.

Also `bee-queue` is used as a job queue using `Redis` to send emails using `node-mailer`, `handlebars` to configure each email and `Mailtrap` for testing purposes, triggered by certain events wich will be described here.

Feel free to clone this project for anything you want.

# About Me

Email: passos.fe@gmail.com

Connect at [LinkedIn](https://www.linkedin.com/in/passosfe/)

# Getting Started

## Prerequisites

In order to run this project you must have the following in your computer:

- Node.js v8+
- PostgreSQL (Running on default port 5432)
- Redis (Running on default port 6379)
- Mailtrap account

## Installing

**Cloning the Repository**

```
$ git clone https://github.com/passosfe/gympoint-app

$ cd gympass-app
```

**Installing dependencies**

```
$ yarn
```

_or_

```
$ npm install
```

**Docker Containers**

- [Docker Compose](https://docs.docker.com/compose/) or another setted Postgres service

First, you need to create a **.env** file in root of application. The structure of this file is similar to the **.env.example** file, just copy and put the correct informations for all variables.

### Setting database with docker compose

#### Starting postgres service with docker compose

If you dont have postgres service installed localy, you can install it with **docker compose**:

```
  ~ docker-compose up -d
```

The postgres container will be created with a user and password setted in **.env** file.

If you try create postgres service with docker compose with a local postgres service running, you will receive a error because the service is already running in the local port 5432.

You can stop postgres service in Mac with the command:

```
  ~ sudo -u postgres ./pg_ctl -D /your/data/directory/path stop
```

#### Creating and configurating database

```
  ~ yarn sequelize db:create
  ~ yarn sequelize db:migrate
  ~ yarn sequelize db:seed:all
```

## Running application

In development mode:

```
  ~ yarn dev

  ~ yarn queue:dev
```

In production mode:

```
  ~ yarn build
  ~ yarn start

  ~ yarn queue
```

# 📗 Documentation

There is a file called `insomnia.json` in the root of application, that is the exported documentation of [insomnia](https://insomnia.rest/).

Insomnia is a software where you can test the requests of your server side application.

# 🕶️ Contributing

This is a open project and is able to receive contributing for all people.
If you have any question about the project, just contact me or open a issue.

# Built With

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
- [@sentry/node](https://github.com/getsentry/sentry-javascript/tree/master/packages/node) - Application monitoring platform that helps you identify issues in real-time.

# License

This project is licensed under the MIT license.
