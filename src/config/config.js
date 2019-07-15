require('dotenv').config()

module.exports = {
  dev: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    options: {
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
    },
    seederStorage: 'sequelize',
  },
  stage: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    options: {
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
    },
    seederStorage: 'sequelize',
  },
  prod: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    options: {
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
    },
    seederStorage: 'sequelize',
  },
}
