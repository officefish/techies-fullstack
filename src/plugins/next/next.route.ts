import { FastifyInstance } from "fastify"

async function routes(server:FastifyInstance) {
    server.next('/')
    server.next('/hello')
    server.next('/home')
}

export { routes as NextRoutes } 