const DB_CONNECT = {
    dialect: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [],
    autoLoadModels: true,
    timezone : '+05:00',
  }

module.exports = {DB_CONNECT}