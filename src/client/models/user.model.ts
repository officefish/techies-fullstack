/**
 * Model User
 * 
 */
const Role = {
  GUEST: 'GUEST',
  MEMBER: 'MEMBER',
  PUBLISHER: 'PUBLISHER',
  DEVELOPER: 'DEVELOPER',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]

export type User = {
    id: string
    email: string
    name: string | null
    verified: boolean
    authenticated: boolean
    role: Role
}