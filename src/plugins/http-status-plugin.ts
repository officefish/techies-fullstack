import fp from 'fastify-plugin'

type CodeStatus = {
    CONTINUE: number
    SWITCHING_PROTOCOLS: number
    PROCESSING: number
    EARLY_HINTS: number
    OK: number
    CREATED: number
    ACCEPTED: number
    NO_AUTHORATIVE: number
    NO_CONTENT: number
    RESET_CONTENT: number
    PARTIAL_CONTENT: number
    MULTI_STATUS: number
    ALREADY_REPORTED: number
    IM_USED: number
    MULTIPLY_CHOICES: number
    MOVED_PERMANENTLY: number
    FOUND: number
    SEE_OTHER: number
    NOT_MODIFIED: number
    USE_PROXY: number
    SWITCH_PROXY: number
    TEMPORARY_REDIRECT: number
    PERMANENT_REDIRECT: number
    BAD_REQUEST: number
    UNAUTHORIZED: number
    PAYMENT_REQUIRED: number
    FORBIDDEN: number
    NOT_FOUND: number
    METHOD_NOT_ALLOWED: number
    NOT_ACCEPTABLE: number
    PROXY_AUTH_REQUIRED: number
    REQUEST_TIMEOUT: number
    CONFLICT: number
    GONE: number
    LENGTH_REQUIRED: number
    PRECONDITION_FAILED: number
    PAYLOAD_TO_LARGE: number
    URI_TOO_LONG: number
    UNSUPPORTED_MEDIA_TYPE: number
    RANGE_NOT_SATISFIABLE: number
    EXPECTATION_FAILED: number
    I_AM_A_TEAPOT: number
    MISDIRECTED_REQUEST: number
    UNPROCESSABLE_ENTITY: number
    LOCKED: number
    FAILED_DEPENDENCY: number
    TOO_EARLY: number
    UPGRADE_REQUIRED: number
    PRECONDITION_REQUIRED: number
    TOO_MANY_REQUESTS: number
    REQUEST_HEADER_FIELDS_TOO_LARGE: number
    UNAVAILABLE_FOR_LEGAL_REASONS: number
    INTERNAL_SERVER_ERROR: number
    NOT_IMPLEMENTED: number
    BAD_GATEWAY: number
    SERVICE_UNAVAILABLE: number
    GATEWAY_TIMEOUT: number
    HTTP_VERSION_NOT_SUPPORTED: number
    VARIANT_ALSO_NEGOTIATES: number
    INSUFFICIENT_STORAGE: number
    LOOP_DETECTED: number
    NOT_EXTENDED: number
    NETWORK_AUTH_REQUIRED: number 
}

declare module 'fastify' {
    interface FastifyReply {
        codeStatus: CodeStatus    
    }
}

const httpStatusPlugin = fp(async (server) => {

    const codeContext = {
        CONTINUE: 100,
        SWITCHING_PROTOCOLS: 101,
        PROCESSING: 102,
        EARLY_HINTS: 103,
        OK: 200,
        CREATED: 201,
        ACCEPTED: 202,
        NO_AUTHORATIVE: 203,
        NO_CONTENT: 204,
        RESET_CONTENT: 205,
        PARTIAL_CONTENT: 206,
        MULTI_STATUS: 207,
        ALREADY_REPORTED: 208,
        IM_USED: 226,
        MULTIPLY_CHOICES: 300,
        MOVED_PERMANENTLY: 301,
        FOUND: 302,
        SEE_OTHER: 303,
        NOT_MODIFIED: 304,
        USE_PROXY: 305,
        SWITCH_PROXY: 306,
        TEMPORARY_REDIRECT: 307,
        PERMANENT_REDIRECT: 308,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401, 
        PAYMENT_REQUIRED: 402,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        METHOD_NOT_ALLOWED: 405,
        NOT_ACCEPTABLE: 406,
        PROXY_AUTH_REQUIRED: 407,
        REQUEST_TIMEOUT: 408,
        CONFLICT: 409,
        GONE: 410,
        LENGTH_REQUIRED: 411,
        PRECONDITION_FAILED: 412,
        PAYLOAD_TO_LARGE: 413,
        URI_TOO_LONG: 414,
        UNSUPPORTED_MEDIA_TYPE: 415,
        RANGE_NOT_SATISFIABLE: 416,
        EXPECTATION_FAILED: 417,
        I_AM_A_TEAPOT: 418,
        MISDIRECTED_REQUEST: 421,
        UNPROCESSABLE_ENTITY: 422,
        LOCKED: 423,
        FAILED_DEPENDENCY: 424,
        TOO_EARLY: 425,
        UPGRADE_REQUIRED: 426,
        PRECONDITION_REQUIRED: 428,
        TOO_MANY_REQUESTS: 429, 
        REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
        UNAVAILABLE_FOR_LEGAL_REASONS: 451,
        INTERNAL_SERVER_ERROR: 500,
        NOT_IMPLEMENTED: 501,
        BAD_GATEWAY: 502,
        SERVICE_UNAVAILABLE: 503,
        GATEWAY_TIMEOUT: 504,
        HTTP_VERSION_NOT_SUPPORTED: 505,
        VARIANT_ALSO_NEGOTIATES: 506,
        INSUFFICIENT_STORAGE: 507,
        LOOP_DETECTED: 508,
        NOT_EXTENDED: 510,
        NETWORK_AUTH_REQUIRED: 511 
    }
    server.decorateReply('codeStatus', { getter: () => codeContext })
    server.log.info('Http Status Plugin Installed.')
})

export { httpStatusPlugin as HttpStatusPlugin }
  