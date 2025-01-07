require('dotenv').config({ path: `${process.cwd()}/.env` });

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME || "postgres",
    "password": process.env.DB_PASSWORD || 1234,
    "database": process.env.DB_NAME || "database_development",
    "host": process.env.DB_HOST || "127.0.0.1",
    "dialect": process.env.DB_DIALECT || "postgres"
  },
  "test": {
    "username": process.env.DB_USERNAME || "root",
    "password": process.env.DB_PASSWORD || null,
    "database": process.env.DB_NAME_TEST || "database_test",
    "host": process.env.DB_HOST || "127.0.0.1",
    "dialect": process.env.DB_DIALECT || "mysql"
  },
  "production": {
    "username": process.env.DB_USERNAME || "root",
    "password": process.env.DB_PASSWORD || null,
    "database": process.env.DB_NAME_PROD || "database_production",
    "host": process.env.DB_HOST || "127.0.0.1",
    "dialect": process.env.DB_DIALECT || "mysql"
  }
};
