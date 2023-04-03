import { useAxiosPostRawDataThanRedirect } from "./axios.service"

export function useSignIn() {
    const {onSubmit, serverError} = useAxiosPostRawDataThanRedirect({
        api:'api/auth',
        route:'sign-in',
        redirect:'me'
    })
    return {onSubmit, serverError}
}

export function useSignUp() {
    const {onSubmit, serverError} = useAxiosPostRawDataThanRedirect({
        api:'api/auth',
        route:'sign-up',
        redirect:'me'
    })
    return {onSubmit, serverError}
}


