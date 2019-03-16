const http = require('http')
const chalk = require('chalk')
const logger = require('winston')
const {
    appTitle,
    env,
    expressHost,
    host,
    port,
    expressPort,
    dialect,
    username,
    database,
    apiRoot
} = require('./config')
const {
    sequelize
} = require('./models')
const express = require('./services/express')

const api = require('./api')
const app = express(apiRoot, api)
const server = http.createServer(app)

setImmediate(() => {
    sequelize.authenticate()
        // sequelize.sync()
        .then(() => {
            server.listen(expressPort, expressHost, () => {
                if ((env === 'localDev') || (env === 'dockerDev')) {
                    const server = (`${process.env.NODE_ENV === 'secure' ? 'https://' : 'http://'}${expressHost}:${expressPort}`)
                    const postgisDB = (`${dialect}://${username}@${host}:${port}/${database}`)
                    console.log('--')
                    console.log(chalk.green(appTitle))
                    console.log(chalk.green(`Enviornment:   ${env}`))
                    console.log(chalk.green(`Server:        ${server}`))
                    console.log(chalk.green(`Database:      ${postgisDB}`))
                }
            })
        })
        .catch((error) => {
            console.log(error) // TODO: Remove for eventually
            logger.error(chalk.red(error))
            process.exit(1)
        })
})
module.exports = app
