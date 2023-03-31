import fp from 'fastify-plugin'
import fastifyStatic from '@fastify/static'
import path from 'node:path'

const staticPlugin = fp(async (server) => {

    const root = path.join(process.cwd(), 'public')
    server.register(fastifyStatic, { root })
    .after(_ => {
        server.log.info('Static Plugin Installed.')
        server.log.info(`Static root is: ${root}`)
    })
    
})

export { staticPlugin as StaticPlugin }