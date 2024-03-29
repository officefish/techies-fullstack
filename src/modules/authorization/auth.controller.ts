import { FastifyReply } from "fastify/types/reply"
import { FastifyRequest } from "fastify/types/request"

import { 
  LoginInput,
  VerifyUserInput,
  CreateTokensInput,
  RegisterInput,
} from "./auth.schema"

import service from '../../services'
import userService from "../user/user.service"
import { User } from "@prisma/client"

import { Role } from "@prisma/client"

async function getProtectedData(request:FastifyRequest, reply:FastifyReply) {
    // try {
    //     // There are built-in ways in Fastify
    //     // to verify that the user is authenticated,
    //     // but we are doing it manually to demonstrate the steps.
    //     await getUser(request, reply);
    //     reply.send({data: 'This is protected data.'});
    //   } catch (e) {
    //     console.error('server.js getProtectedData:', e.message);
    //     reply.code(401).send();
    //   }
}

async function getUnprotectedData(request:FastifyRequest, reply:FastifyReply) {
    reply.send({data: 'This is unprotected data.'})
}


async function initialize (request:FastifyRequest ) {    
  const jwttoken = request.headers['authorization']
  const tokenArray = jwttoken?.toString().split(" ") || []
  const tokenPayload = tokenArray[1] && request.server.jwt.decode(tokenArray[1])
  const identity = tokenPayload && Object(tokenPayload).id || '' 
  request.user = Object(tokenPayload)
  request.server.user.id =  identity
}

async function authenticate(request:FastifyRequest, reply:FastifyReply) {

    const jwt = request.server.jwt
    try {
      const accessToken = request.cookies['access-token'] || ""
      await service.Verify(jwt, accessToken)
    
    } catch (e) {
      try {
        const refreshToken = request.cookies['refresh-token'] || ""
        await service.Verify(jwt, refreshToken)
      } catch (e) {
        reply.code(reply.codeStatus.CONFLICT)
          .send({error: { message:'Refresh token is invalid.'}})
      }

      try {
        const userId = request.session.userId || ""
        const userRole = request.session.userRole
        const {sessionToken} =  await service.RegenerateSession({request, reply, userId, userRole})
        await createTokenCookies({ userId, sessionToken, request, reply})

      } catch (e) {
        reply.code(reply.codeStatus.NOT_ACCEPTABLE)
          .send({error: { message:'Error occurs with regenerate session.'}})
      }
  }
}

async function verifyUser(request:FastifyRequest<{
  Params: VerifyUserInput
}>, reply:FastifyReply) {
    const {expires, token} = request.params
    const email = decodeURIComponent(request.params.email)
    // Determine if the token matches the
    // specified email and expires timestamp.
    const crypto = request.server.minCrypto
    const signature = request.server.env.JWT_SIGNATURE

    const emailToken = await service.CreateJwt(crypto, {signature, email, expires}, ':')
    const matches = token === emailToken
  
    if (!matches || Date.now() > +expires) {
      reply.code(reply.codeStatus.GONE)
        .send({error: { message:'Verify link expired'}})
      return
    }
  
    try {
      const prisma = request.server.prisma
      const role = Role.MEMBER
      const user = await userService.UpdateUser(prisma, {email, role, verified:true})
      if (!user) {
        reply.code(reply.codeStatus.CONFLICT)
         .send({error: {message: 'User update failed'}})
         return
      }
     
      const secure = false
      const domain = 'localhost'
      const port = 8001
      
      const link = service.GetMeRedirectLink({secure, domain, port})
      reply.redirect(link)

    } catch (e) {
      reply.code(reply.codeStatus.UNPROCESSABLE_ENTITY)
        .send({error: { message:'User update failed'}})
    }
}

async function register2FA(request:FastifyRequest, reply:FastifyReply) {

}

async function login2FA(request:FastifyRequest, reply:FastifyReply) {

}

async function login(request:FastifyRequest<{
  Body: LoginInput
}>, reply:FastifyReply) 
{
  const {email, password} = request.body
  const prisma = request.server.prisma
  const bcrypt = request.server.bcrypt

  try {
     
      const user = await userService.GetUniqueUser(prisma, {email})
      const samePassword = await service.Compare(bcrypt, password, user?.password || '')
      if (!user || !samePassword) {
        reply.code(reply.codeStatus.UNAUTHORIZED).send({error:{ message:'invalid email or password'}})
        return
      }
      // If the user has enabled two-factor authentication (2FA) ...
      // Don't login until a 2FA code is provided.
      if (user.secret) { 
        reply.code(reply.codeStatus.FORBIDDEN).send({userId: user.id, status: '2FA'})
        return
      } 
      // 2FA is not enabled for this account,
      // so create a new session for this user.
      //await updateSession(request, reply, user)
      const userId = user.id
      const userRole = user.role
      const {sessionToken} = await service.RegenerateSession({request, reply, userId, userRole})

      await createTokenCookies({ userId, sessionToken, request, reply})
      
      if (!user.verified) {
        await sendVerifyEmail(request, reply, email)
      }

      const payload = {
        id: user?.id,
        email: user?.email,
        name: user?.name,
        verified: user?.verified,
        authenticated: true,
        role: user?.role
      }
      reply.code(reply.codeStatus.ACCEPTED).send(payload)

  } catch (e) {
    reply.code(500).send(e)
  }
}

async function register(request:FastifyRequest<{
  Body:RegisterInput
}>, reply:FastifyReply) {
    
    const {email, password, name} = request.body
    const saltLength = request.server.env.JWT_SALT_LENGTH
    const bcrypt = request.server.bcrypt
    const prisma = request.server.prisma
  
    try {
      const salt = await service.GenerateSalt(bcrypt, saltLength)
      const hashedPassword = await service.Hash(bcrypt, password, salt)
  
      // Insert a record into the "user" collection.
      const data = { name, email, password:hashedPassword, salt, verified: false }
      await userService.CreateUser(prisma, data)

    } catch (e) {
      reply.code(reply.codeStatus.CONFLICT).send(e)
    }

    try {
      // After successfully creating a new user, automatically log in.
      await login(request, reply)
  
    } catch (e) {
      reply.code(reply.codeStatus.FORBIDDEN).send(e)
    }

}

async function logout(request:FastifyRequest, reply:FastifyReply) {
  try {
        
        const {options} = await service.RegenerateSession({request, reply})
      
        // Clear the access and refresh token cookies for this session.
        service.ClearCookie({reply, name:'access-token', options})
        service.ClearCookie({reply, name:'refresh-token', options})
        reply.code(200).send({status:'logged out'})
    
      } catch (e) {
        reply.code(400).send({error:e})
    }
}

async function createTokenCookies(p: CreateTokensInput) {
  const jwt = p.request.server.jwt
  const accessTokenMinutes = p.request.server.env.ACCESS_TOKEN_MINUTES
  const refreshTokenDays = p.request.server.env.REFRESH_TOKEN_DAYS
  const cookieOptions = p.request.server.cookieOptions 

  try {
    const accessToken = await service.Sign(jwt, {userId: p.userId, sessionToken: p.sessionToken})
    const accessExpires = service.NowPlusMinutes(accessTokenMinutes)
    const accessOptions = {...cookieOptions, expires:accessExpires}
    service.CreateCookie( 
      {reply:p.reply, 
      name:'access-token', value:accessToken, 
      options:accessOptions})

    const refreshToken = await service.Sign(jwt, {sessionToken:p.sessionToken})
    const refreshExpires = service.NowPlusDays(refreshTokenDays)
    const refreshOptions = {...cookieOptions, expires:refreshExpires}
    service.CreateCookie(
      {reply: p.reply,
      name: 'refresh-token', value: refreshToken,
      options: refreshOptions})

  } catch (e) {
    console.error('createTokens error:', e);
    throw new Error('error refreshing tokens')
  }
}

async function sendVerifyEmail(request:FastifyRequest, reply:FastifyReply, email: string) {

    const mailer = request.server.nodemailer

    const secure = false
    const domain = 'localhost'
    const port = 8001

    const link_expires = request.server.env.LINK_EXPIRE_MINUTES
    const expires = service.NowPlusMinutes(link_expires).getTime().toString()

    const crypto = request.server.minCrypto
    const signature = request.server.env.JWT_SIGNATURE
    const token = await service.CreateJwt(crypto, {signature, email, expires}, ':')

    const link = service.GetVerifyEmailLink({secure, domain, port, email, expires, token })

    const subject = request.server.env.SMTP_SUBJECT
    const from = request.server.env.FROM_EMAIL
    const html =
      'Click the link below to verify your account.<br><br>' +
      `<a href="${link}">VERIFY</a>`
    //return sendEmail({to: email, subject, html})
   
    try {    
      return await service.SendMail(mailer, {from, to: email, subject, html})   
    } catch (e) {
      reply.code(500).send(e)
      //reply.code(500).send('Error with sending vefification email.')
    }
}



async function updateSession(request:FastifyRequest, reply:FastifyReply, user:User) {
  //const tokenLength = request.server.env.SESSION_TOKEN_LENGTH
  //const bcrypt = request.server.bcrypt
  //const prisma = request.server.prisma
  

  try {    
    // const userAgent = request.headers['user-agent'] || ''
    // await service.CreateSession(prisma, {
    //   userId: user.id,
    //   token: sessionToken,
    //   isMobile:service.IsMobile(userAgent),
    //   userAgent
    // })
    // Create cookies containing access and refresh tokens.
    
  } catch (e) {
    throw new Error('session creation failed')
  }
}

export { 
    initialize as InitializeHandler,
    authenticate as AuthenticateHandler,
    login as LoginHandler, 
    logout as LogoutHandler,
    register as RegisterHandler,
    getProtectedData as GetProtectedDataHandler,
    getUnprotectedData as GetUnprotectedDataHandler,
    verifyUser as VerifyUserHandler,
    register2FA as Register2FAHandler,
    login2FA as Login2FAHandler,
}

export const authController = {
  login,
  logout,
  register
}
