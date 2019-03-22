const path = require('path')

const config = {
  all: {
    env: process.env.NODE_ENV || 'localDev',
    root: path.join(__dirname, '..'),
    host: 'localhost',
    expressHost: 'localhost',
    port: '5432',
    expressPort: '3000',
    dialect: 'postgresql',
    database: 'notesDev',
    username: 'postgres',
    password: 'password',
    apiRoot: process.env.API_ROOT || '/api',
    appTitle: 'Notes API in Dev Mode',
    defaultEmail: 'no-reply@notes.com',
    dbOptions: {
      host: 'localhost',
      port: '5432',
      force: true,
      logging: false,
      dialect: 'postgresql',
      pool: {
        max: 100,
        min: 0,
        idle: 10000
      }
    }
  },
  dockerDev: {
    env: process.env.NODE_ENV || 'dockerDev',
    root: path.join(__dirname, '..'),
    host: 'notes_postgresDB',
    expressHost: 'notes_api',
    port: '5432',
    expressPort: '3000',
    dialect: 'postgresql',
    database: 'notesDev',
    username: 'postgres',
    password: 'password',
    apiRoot: process.env.API_ROOT || '/api',
    appTitle: 'Notes API in Docker Dev Mode',
    defaultEmail: 'no-reply@notes.com',
    dbOptions: {
      host: 'notes_postgresDB',
      port: '5432',
      force: true,
      dialect: 'postgresql',
      pool: {
        max: 100,
        min: 0,
        idle: 10000
      }
    }
  }
}

module.exports = Object.assign(config.all, config[config.all.env])
