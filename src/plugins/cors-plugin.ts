import fp from 'fastify-plugin'
import cors from '@fastify/cors'

  // app.register(fastifyCors, {
  //   credentials: true, // required to return cookies
  //   origin: [
  //     // origin of requests from UI;
  //     // leading dot means to allow use in subdomains
  //     /\.nodeauth\.dev$/,
  //     'https://nodeauth.dev'
  //   ]
  // });

const corsPlugin = fp(async (server) => {

    server.register(cors, {
        credentials: true, // required to return cookies
        // origin: (origin, cb) => {
        //     origin = origin || ''
        //     const hostname = new URL(origin).hostname
        //     console.log(hostname)
        //     if(
        //         hostname === "localhost"
        //         || hostname === "127.0.0.1"
        //         || hostname === "0.0.0.0"
        //     ){
        //     //  Request from localhost will pass
        //         cb(null, true)
        //         return
        //     }
        //     // Generate an error on other origins, disabling access
        //     cb(new Error("Not allowed"), false)
        // },
        origin: ['http://localhost:8001', "http://127.0.0.1:8001", "http://0.0.0.0:8001",
                'http://localhost:3000', "http://127.0.0.1:3000", "http://0.0.0.0:3000"],
        methods: ['GET', 'PUT', 'POST', 'DELETE']
   })

   .after((err) => {
        if (err) console.error(err)  
        server.log.info('Cors Plugin Installed.')
    })
    //await server.after()
    
})


export { corsPlugin as CorsPlugin }