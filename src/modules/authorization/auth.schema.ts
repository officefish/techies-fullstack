import {z} from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

import { FastifyReply } from "fastify/types/reply"
import { FastifyRequest } from "fastify/types/request"
import { CookieOptions } from '@fastify/session'

import { Role } from '@prisma/client'
const roleEnum = z.nativeEnum(Role)

const email = {
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    })
    .email({ message: "Invalid email address" })
}
const password = {
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
    })
    .min(8, { message: "Must be 8 or more characters long" })
}
const name = {
    name: z.string()
        .min(7, {message: "Must be 7 or more characters long"})
        .max(24, {message: "Must be 24 or less characters long"})
        .optional()
}
const id = { id: z.string() }

export const loginUserSchema = z.object({
    ...email,
    ...password,
})
const userAcceptedResponseSchema = z.object({
    ...id,
    ...name,
    ...email,
    verified: z.boolean(),
    authenticated: z.boolean(),
    role:roleEnum.optional()
})

const registerUserSchema = z.object({
    ...email,
    ...password,
    ...name,
})

const verifyUserSchema = z.object({
    ...email,
    expires: z.string(),
    token: z.string()
})

const goodResponseSchema = z.object({
    status: z.string()
})

type LoginInput = z.infer<typeof loginUserSchema>
type RegisterInput = z.infer<typeof registerUserSchema>
type VerifyUserInput = z.infer<typeof verifyUserSchema>

type CreateTokensInput = {
    userId: string, 
    sessionToken: string, 
    request: FastifyRequest, 
    reply: FastifyReply
}

type CreateCookieInput = {
    reply:FastifyReply, 
    name:string, 
    value:string, 
    options:CookieOptions,
}

type ClearCookieInput = {
    reply:FastifyReply,
    name:string,
    options:CookieOptions
}

type SendVerifyEmailInput = {
    email: string,
    domain: string,
    expires: number
}

export { 
    type LoginInput,
    type VerifyUserInput,
    type RegisterInput,
    type CreateCookieInput,
    type ClearCookieInput,
    type CreateTokensInput,
    type SendVerifyEmailInput
}

export const {schemas:AuthSchemas, $ref} = buildJsonSchemas({
    loginUserSchema,
    verifyUserSchema,
    registerUserSchema,
    userAcceptedResponseSchema,
    goodResponseSchema
}, {$id: 'AuthSchemas'})


