const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const compression = require('compression')
const bodyParser = require('body-parser')
const forceSSL = require('express-force-ssl')
const {
    env
} = require('../../config')
module.exports = (apiRoot, routes) => {
    const app = express()
    /* istanbul ignore next */
    if (env === 'production') {
        app.set('forceSSLOptions', {
            enable301Redirects: false,
            trustXFPHeader: true
        })
        app.use(forceSSL)
    }
    /* istanbul ignore next */
    if (env === 'production' || env === 'localDev' || env === 'dockerDev') {
        app.use(cors())
        app.use(compression())
        app.use(morgan('dev'))
        // do i need to put winston here with ('dev')?
    }
    app.use(bodyParser.urlencoded({
        extended: false
    }))
    app.use(bodyParser.json())
    // Enable logger (morgan) if enabled in the configuration file
    // if (_.has(config, 'log.format')) {
    //
    // }
    // TODO: add helment configuraiton
    app.use(apiRoot, routes)
    // NOTE: you could add error handlers here.
    return app
}
