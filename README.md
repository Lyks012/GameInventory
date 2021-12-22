# Ionic (frontend) and NodeJs (backend) Example using Basic Authentication

This project is just a project example to learn how to use Basic Authentication in Ionic 5 (frontend) and NodeJS (backend) using Sequelize as ORM to access a MySQL database.

## Getting Started

Download links:

From Github: https://github.com/Lyks012/GameRating.git

Postman Endpoints : https://documenter.getpostman.com/view/18127118/UVRBo6my

## Prerequisites

You need a working environment with:

- [Git](https://git-scm.com) - You can install it from https://git-scm.com/downloads.
- [MySQL](https://www.mysql.com) - You can install it from https://www.mysql.com/downloads/.
- [Node.js](https://nodejs.org) - Install node.js from https://nodejs.org/es/download/. It's advisable to install the LTS version.

## General Installation instructions

The best option to start with this project is cloning it in your PC:

```
git clone https://github.com/Lyks012/GameRating.git
```

This project contains 2 different parts:

- Frontend
- Backend

You need a node.js working environment. The LTS is recommended: https://nodejs.org/es/

Once you have cloned the project install all dependencies.

```
cd frontend
npm install

cd backend
npm install
```

- For your backend part:

1. You need a backend/config/db.config.js file with  the data for the connection to your MySQL Server:

```

{
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "video_games",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}
```

2. You need a mysql server working.

3. Create the mysql database, that in our case is "video_games". You can import it from the file db_motorbikes_dev.sql included in this project. https://github.com/tcrurav/Ionic5NodeAuthBasic/blob/master/backend/db_motorbikes_dev.sql

Finally to start enjoying this project.

```
cd backend
npm start

cd frontend
ionic serve
```

Enjoy!!!

## Built With

- [Visual Studio Code](https://code.visualstudio.com/) - The Editor used in this project
- [Node.js](https://nodejs.org/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [sequelize](https://sequelize.org/) - Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.
- [express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
- [MySQL Workbench](https://www.mysql.com/products/workbench/) - MySQL Workbench is a unified visual tool for database architects, developers, and DBAs.
- [dotenv](https://www.npmjs.com/package/dotenv) - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

## Acknowledgments

- https://sequelize.org/master/. The ORM sequelize documentation.
- https://github.com/tcrurav/Ionic5NodeAuthBasic/edit/master/README.md. A complete README.md that inspired me.
