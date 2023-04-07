//import useRequest from "./axios.service"
import { 
    useAxiosFetcher_GET,
    useAxios_GET_QueryParams,
    useAxios_POST_RawData_Redirect
} from "./axios.service"
import useSWR from "swr"
import { SubmitHandler } from "react-hook-form"
import { FieldValues } from "react-hook-form"
import { User } from "@models/user.model"
import { useState } from "react"

import { Dispatch, SetStateAction } from "react"

export function useUser() {

    const api = 'api/users'
    const route = 'me'
    const key = `${api}/${route}`

    const {fetcher} = useAxiosFetcher_GET({ api, route })

    const { data: user, 
        error,
        isValidating,
        mutate } = useSWR<User>(key, fetcher)

    return {user, error, isValidating, mutate}
}

type ForgotPasswordHookProps = {
    setEmail: Dispatch<SetStateAction<string>>
}

export const useResetPassword = () => {
    const {onSubmit, serverError} = useAxios_POST_RawData_Redirect({
        api: 'api/users',
        route: 'reset',
        redirect: 'auth/sign-in'
    })
    return {onSubmit, serverError}
}

export const useForgotPassword = <T = {}>({setEmail}: ForgotPasswordHookProps) => {

    const {onSubmit: onSubmitMiddleware, reply, serverError
    } = useAxios_GET_QueryParams<T>({ api:'api/users', route: 'forgot-password'})

    const onSubmit: SubmitHandler<FieldValues> = async ({email}) => {
        onSubmitMiddleware(email)
        setEmail(email)
    }

    return{onSubmit, reply, serverError}
}

