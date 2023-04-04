import { useEffect } from "react"
import { useAxios_POST_RawData } from "./axios.service"
import { useUser } from "./user.service"
import { useRouter } from "next/router"

import { User } from "../models/user.model"

function useHook({
    api = 'api/auth',
    route = '/',
    redirect = '/me'
} = {}) {
    const {onSubmit, data: user, serverError} = useAxios_POST_RawData<User>({
        api, route
    })
    const router = useRouter()
    const { mutate } = useUser()
    useEffect(() => {
        if (!user) return 
        mutate(user)
            .then(() => {
                router.push(redirect)
            })
            .catch(e => {
                //console.log(e)
            })  
    }, [user])
    return {onSubmit, serverError}
}

export function useSignIn() {
    return useHook({route:'sign-in'})
}

export function useSignUp() {
    return useHook({route:'sign-up'})
}



