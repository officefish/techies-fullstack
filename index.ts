import { buildApp, startApp, AppOptions, buildEmpty } from './src/app'

const envToLogger = {
    development: {
        transport: {
            target: 'pino-pretty',
            options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
            },
        },
        customLevels: {
            init: 35
        }
    },
    production: {
        customLevels: {
            init: 35
        }
    },
    test: false,
  }

const environment = process.env.NODE_ENV

const options: AppOptions = {
    logger: envToLogger[environment] ?? true,
    pluginTimeout: 120_000
}

const start = async () => {
    const app = await buildApp(options)
    await startApp(app)
    app.log.info(`environment: ${environment}`)
}
  
start()

