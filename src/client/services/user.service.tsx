//import useRequest from "./axios.service"
import { 
    useAxiosFetcher_GET,
    useAxios_GET_QueryParams
} from "./axios.service"
import useSWR from "swr"
import { SubmitHandler } from "react-hook-form"
import { FieldValues } from "react-hook-form"
import { User } from "@models/user.model"

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


export const useForgotPassword = () => {
    const {onSubmit: onSubmitMiddleware, reply, serverError
    } = useAxios_GET_QueryParams<string>({ api:'api/users', route: 'forgot-password'})

    const onSubmit: SubmitHandler<FieldValues> = async ({email}) => {
        onSubmitMiddleware(email)
    }

    return{onSubmit, reply, serverError}
}