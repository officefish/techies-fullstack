 
import fastifyNextJS from '@fastify/nextjs' 
import fp from 'fastify-plugin'

import { FastifyReply } from "fastify/types/reply"
import { FastifyRequest } from "fastify/types/request"

// const nextJsProxyRequestHandler = function (request: FastifyRequest, reply: FastifyReply) {
//     nextRequestHandler(proxyFastifyRawRequest(request), proxyFastifyRawReply(reply))
// }

// const nextJsRawRequestHandler = function (request: FastifyRequest, reply: FastifyReply) {
//     nextRequestHandler(request.raw, reply.raw)
// }

const nextPlugin = fp(async (server) => {
    
    server.register(fastifyNextJS, {dev:false, noServeAssets:true})
    .after(() => {
        
        server.next(`${process.env.BASE_PATH || ''}/_next/*`, async (app, req, reply) => {
        //   // your code
            return app.getRequestHandler()(req.raw, reply.raw).then(() => {
                reply.hijack()
            })
         })
    })

    server.get(`${process.env.BASE_PATH || ''}/_next/webpack-hmr`, async (req, reply) => {
        reply.status(200).send('ok')
    })
   
    server.log.info('Prisma Plugin Installed.')
})

export { nextPlugin as NextPlugin }