//import useRequest from "./axios.service"
import { useAxiosFetcher_GET } from "./axios.service"
import useSWR from "swr"

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
