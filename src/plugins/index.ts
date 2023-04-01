import { PrismaPlugin } from "./prisma-plugin"
import { MinCryptoPlugin } from "./min-crypto-plugin"
import { JwtPlugin } from "./auth/jwt-plugin"
import { SwaggerPlugin } from "./swagger-plugin"
import { ShutdownPlugin } from "./shutdown-plugin"
import { MercuriusPlugin } from "./mercurius-plugin"
import { PothosPlugin } from "./pothos-plugin"
import { DotEnvPlugin } from "./dotenv-plugin"
import { CookiePlugin } from "./auth/cookie-plugin"
import { SessionPlugin } from "./auth/session-plugin"
import { MailPlugin } from "./mail-plugin"
import { AuthPlugin } from "./auth/auth-plugin"
import { NextPlugin } from "./next/next-plugin"
import { StaticPlugin } from "./static-plugin"
import { CorsPlugin } from "./cors-plugin"
import { HttpStatusPlugin } from "./http-status-plugin"

export { MinCrypto } from "./min-crypto-plugin"

export default {
    HttpStatusPlugin,
    DotEnvPlugin,
    CorsPlugin,
    PrismaPlugin,
    MailPlugin,
    AuthPlugin,
    SessionPlugin,
    MinCryptoPlugin,
    JwtPlugin,
    CookiePlugin,
    SwaggerPlugin,
    ShutdownPlugin,
    PothosPlugin,
    MercuriusPlugin,
    StaticPlugin,
    NextPlugin
}

