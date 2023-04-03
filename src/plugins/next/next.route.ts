import { FastifyInstance } from "fastify"
import { FastifyRequest } from "fastify"
import { FastifyReply } from "fastify"
import { NextServer } from "next/dist/server/next"

// not working way
//import { IncomingMessage } from "http"
// declare module 'http' {
//     interface IncomingMessage {
//         server?: FastifyInstance
//     }
// }

async function routes(server:FastifyInstance) {
    server.next('/')
    server.next('/home')
    server.next('/me')

    server.next(`/log-in`, async (app:NextServer, req:FastifyRequest, reply:FastifyReply) => {   
        // here we potentialy can forward fastify instance to req.raw
        //req.raw.server = req.server
        await app.render(req.raw, reply.raw, '/log-in', {})
        reply.hijack()
    })
    server.next(`/sign-in`)
}

export { routes as NextRoutes } 