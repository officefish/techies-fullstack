interface LinkProps {
    secure: boolean,
    domain: string,
    port: number,
    
}
interface RouteLinkProps extends LinkProps {
    route: string
}
interface TokenLinkProps extends LinkProps {
    email: string,
    expires: string,
    token: string
}
interface RouteTokenLinkProps extends TokenLinkProps {
    route: string,
    api: string
}

const getTokenLink = ({secure, domain, port, email, expires, token, api, route}: RouteTokenLinkProps ) => {
    const protocol = secure ? 'https' : 'http'
    const encodedEmail = encodeURIComponent(email)
    return `${protocol}://${domain}:${port}/${api}/${route}/` +
           `${encodedEmail}/${expires}/${token}`
           
}

// const getTokenQueryParamsLink = ({secure, domain, port, email, expires, token, api, route}: RouteTokenLinkProps ) => {
//     const protocol = secure ? 'https' : 'http'
//     const encodedEmail = encodeURIComponent(email)
//     return `${protocol}://${domain}:${port}/${api}/${route}` +
//            `?email=${encodedEmail}/expires=${expires}/token=${token}`
// }

const getLink = ({secure, domain, port, route}: RouteLinkProps) => {
    const protocol = secure ? 'https' : 'http'
    return `${protocol}://${domain}:${port}/${route}` 
}

const getResetPasswordLink = (input: TokenLinkProps) => {
    return getTokenLink({...input, api:'auth', route: 'password-reset' }) 
}

const getVerifyEmailLink = (input: TokenLinkProps) => {
    return getTokenLink({...input, api:'api/auth', route: 'verify' })
}

const getMeRedirectLink = (input: LinkProps) => {
    return getLink({...input, route:'me'})
}

export {  
    getResetPasswordLink as GetResetPasswordLink,
    getVerifyEmailLink as GetVerifyEmailLink,
    getMeRedirectLink as GetMeRedirectLink
}


