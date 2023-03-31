import { buildApp, startApp, AppOptions, buildEmpty } from './src/app'

const options: AppOptions = {
    logger: true,
    pluginTimeout: 120_000
}

const start = async () => {
    const app = await buildApp(options)
    await startApp(app)
}
  
start()

