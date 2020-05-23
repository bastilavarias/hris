require("dotenv").config();

module.exports = {
  development: {
    client: "mysql2",

    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    },

    migrations: {
      directory: __dirname + "/src/db/migrations",
    },

    seeds: {
      directory: __dirname + "/src/db/seeds",
    },
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
  },
};
