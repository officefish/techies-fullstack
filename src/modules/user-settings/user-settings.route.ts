import { FastifyInstance } from "fastify"
//import { $ref } from "./user.schema"

import {
    UpdateUserSettingsHandler,
} from './user-settings.controller'

async function routes(server:FastifyInstance) {

    /* User Role decorators */
    
    /* User api. Seems it should be in user module. */
    server.post('/update', {
        schema: {
            //body: $ref('createUserSchema'),
            //response: {
            //     201: $ref('userResponseSchema'),
            //},
            description: 'Create new User.',
            tags: ['user', 'user-settings'],
        }
      }, UpdateUserSettingsHandler)

   

    //await server.after()
    server.log.info('User settings routes added.')
}

export { routes as UserSettingsRoutes } 