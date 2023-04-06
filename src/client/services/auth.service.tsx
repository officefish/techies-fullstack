import { useEffect } from "react"
import { 
    useAxios_POST_RawData,
    useAxios_GET_QueryParams
} from "./axios.service"
import { useUser } from "./user.service"
import { useRouter } from "next/router"

import { User } from "../models/user.model"

function useHook_POST_RawData({
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



export const  useSignIn = () => useHook_POST_RawData({route:'sign-in'})
export const useSignUp = () => useHook_POST_RawData({route:'sign-up'})





