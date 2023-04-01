import fp from 'fastify-plugin'
import cors from '@fastify/cors'


const corsPlugin = fp(async (server) => {

    server.register(cors, {
        credentials: true, // required to return cookies
        origin: (origin, cb) => {
            origin = origin || ''
            const hostname = new URL(origin).hostname
            if(hostname === "localhost"){
            //  Request from localhost will pass
                cb(null, true)
                return
            }
            // Generate an error on other origins, disabling access
            cb(new Error("Not allowed"), false)
        },
        methods: ['GET', 'PUT', 'POST', 'DELETE']
   })
   .ready((err) => {
        if (err) console.error(err)  
        server.log.info('Cors Plugin Installed.')
    })
    //await server.after()
    
})


export { corsPlugin as CorsPlugin }