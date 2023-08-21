import { FastifyReply } from "fastify/types/reply"
import { FastifyRequest } from "fastify/types/request"

async function updateUserSettings(
    request:FastifyRequest, 
    reply:FastifyReply) 
{
    //const {skip, take} = request.params
    //const server = request.server
    //const users = userService.FindManyUsers(server.prisma, {skip, take})
    //if (users) {
    //  return reply.code(200).send({ ...users})
    //}
    //return reply.code(401).send({ error: { message: "No users found" }})

    return reply.code(200).send({ 'status':'ok' })

}


export {     
    updateUserSettings as UpdateUserSettingsHandler,
}

