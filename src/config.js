const path = require('path')

/* istanbul ignore next */
const requireProcessEnv = (name) => {
    if (!process.env[name]) {
        throw new Error(`You must set the ${name} enviornment variable`)
    }
    return process.env[name]
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv-safe')
    dotenv.load({
        path: path.join(__dirname, '../.env'),
        sample: path.join(__dirname, '../.env.example')
    })
}
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
        sendgridKey: requireProcessEnv('SENDGRID_API_KEY'),
        masterKey: requireProcessEnv('MASTER_KEY'),
        jwtSecret: requireProcessEnv('JWT_SECRET'),
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
        // log: {
        // // logging with Morgan - https://github.com/expressjs/morgan
        // // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
        //   format: 'dev',
        //   fileLogger: {
        //     directoryPath: process.cwd(),
        //     fileName: 'app.log',
        //     maxsize: 10485760,
        //     maxFiles: 2,
        //     json: true
        //   }
        // }
    },
    localDev: {
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
        appTitle: 'Notes API',
        defaultEmail: 'no-reply@notes.com',
        sendgridKey: requireProcessEnv('SENDGRID_API_KEY'),
        masterKey: requireProcessEnv('MASTER_KEY'),
        jwtSecret: requireProcessEnv('JWT_SECRET'),
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
        // log: {
        // // logging with Morgan - https://github.com/expressjs/morgan
        // // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
        //   format: 'dev',
        //   fileLogger: {
        //     directoryPath: process.cwd(),
        //     fileName: 'app.log',
        //     maxsize: 10485760,
        //     maxFiles: 2,
        //     json: true
        //   }
        // }
    },
    dockerDev: {
        env: process.env.NODE_ENV || 'dockerDev',
        root: path.join(__dirname, '..'),
        host: 'postgisDB',
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
        sendgridKey: requireProcessEnv('SENDGRID_API_KEY'),
        masterKey: requireProcessEnv('MASTER_KEY'),
        jwtSecret: requireProcessEnv('JWT_SECRET'),
        dbOptions: {
            host: 'postgisDB',
            port: '5432',
            force: true,
            dialect: 'postgresql',
            pool: {
                max: 100,
                min: 0,
                idle: 10000
            }
        }
        // log: {
        // // logging with Morgan - https://github.com/expressjs/morgan
        // // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
        //   format: 'dev',
        //   fileLogger: {
        //     directoryPath: process.cwd(),
        //     fileName: 'app.log',
        //     maxsize: 10485760,
        //     maxFiles: 2,
        //     json: true
        //   }
        // }
    },
    localTest: {
        env: process.env.NODE_ENV || 'localTest',
        root: path.join(__dirname, '..'),
        host: 'localhost',
        expressHost: 'localhost',
        port: '5432',
        expressPort: '3001',
        apiRoot: process.env.API_ROOT || '/api',
        appTitle: 'Notes API in Local Test Mode',
        masterKey: 'bunchaletterzandnumbers',
        jwtSecret: 'bunchaletterzandnumbers',
        dialect: 'postgresql',
        database: 'notesTest',
        username: 'postgres',
        dbOptions: {
            host: 'localhost',
            dialect: 'postgresql',
            logging: false,
            port: '5432',
            pool: {
                max: 100,
                min: 0,
                idle: 10000
            }
        }
    },
    dockerTest: {
        env: process.env.NODE_ENV || 'dockerTest',
        root: path.join(__dirname, '..'),
        host: 'postgisDB',
        expressHost: 'notes',
        port: '5432',
        expressPort: '3002',
        apiRoot: process.env.API_ROOT || '/api',
        appTitle: 'Notes API in Docker Test Mode',
        masterKey: 'bunchaletterzandnumbers',
        jwtSecret: 'bunchaletterzandnumbers',
        dialect: 'postgresql',
        database: 'notesTest',
        username: 'postgres',
        dbOptions: {
            host: 'postgisDB',
            dialect: 'postgresql',
            logging: false,
            port: '5432',
            pool: {
                max: 100,
                min: 0,
                idle: 10000
            }
        }
    },
    production: {
        env: process.env.NODE_ENV || 'production',
        root: path.join(__dirname, '..'),
        ip: process.env.IP || '127.0.0.2',
        host: requireProcessEnv('API_HOST'),
        port: requireProcessEnv('API_PORT'),
        apiRoot: process.env.API_ROOT || '/api',
        appTitle: 'notes',
        defaultEmail: 'no-reply@waggles-api.com',
        sendgridKey: requireProcessEnv('SENDGRID_API_KEY'),
        masterKey: requireProcessEnv('MASTER_KEY'),
        jwtSecret: requireProcessEnv('JWT_SECRET'),
        dialect: 'postgresql',
        database: requireProcessEnv('DATABASE_NAME'),
        username: requireProcessEnv('USERNAME_POSTGRES'),
        password: requireProcessEnv('DATABASE_PASSWORD'),
        dbOptions: {
            dialect: 'postgresql',
            logging: false,
            pool: {
                max: 100,
                min: 0,
                idle: 10000
            }
        }
        // log: {
        // // logging with Morgan - https://github.com/expressjs/morgan
        // // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
        // format: process.env.LOG_FORMAT || 'combined',
        // fileLogger: {
        //   directoryPath: process.env.LOG_DIR_PATH || process.cwd(),
        //   fileName: process.env.LOG_FILE || 'app.log',
        //   maxsize: 10485760,
        //   maxFiles: 2,
        //   json: false
        // }
    }
}

module.exports = Object.assign(config.all, config[config.all.env])
