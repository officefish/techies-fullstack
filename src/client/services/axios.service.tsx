import useSWR, { SWRConfiguration, SWRResponse } from 'swr'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

import { useState } from 'react'
import { useRouter } from "next/router"

const HOST = "localhost"
const PORT = 8001

export function useAxiosPostRawDataThanRedirect ({
    protocol = 'http',
    host = HOST,
    port = PORT,
    api = 'api',
    route = 'me',
    redirect = 'me',
    options = { 
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
}} = {}) {

    const caller = async (input: any) => {
        
        const params = JSON.stringify({...input})
        const url = `${protocol}://${host}:${port}/${api}/${route}`
        return await axios
            .post(url, params, options)
                .then(response => response.data)
                .catch(error => error) 
    } 

    const [serverError, setServerError] = useState<Error | undefined>(undefined)
    const router = useRouter()

    const onSubmit = async (data:any) => {
        const response = await caller(data)
        if (response instanceof Error) {
            setServerError(response)
        } else {
            router.push(`/${redirect}`)
        }
    }

    return {onSubmit, serverError}
}


export function useAxiosPostRawData ({
    protocol = 'http',
    host = HOST,
    port = PORT,
    api = 'api',
    route = 'me',
    options = { 
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
}} = {}) {

    const caller = async (input: any) => {
        
        const params = JSON.stringify({...input})
        const url = `${protocol}://${host}:${port}/${api}/${route}`
        return await axios
            .post(url, params, options)
                .then(response => response.data)
                .catch(error => error) 
    } 

    const onSubmit = async (data:any) => {
        const response = await caller(data)
        return response
    }

    return {onSubmit}
}

export function useAxiosGet ({
    protocol = 'http',
    host = HOST,
    port = PORT,
    api = 'api',
    route = 'me',
    options = { 
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
}} = {}) {

    const caller = async () => {
        
        const url = `${protocol}://${host}:${port}/${api}/${route}`
        return await axios
            .get(url, options)
                .then(response => response.data)
                .catch(error => error) 
    } 

    const onSubmit = async (data:any) => {
        const response = await caller()
        return response
    }

    return {onSubmit}
}

export function useAxiosFetcher_GET ({
  protocol = 'http',
  host = HOST,
  port = PORT,
  api = 'api',
  route = 'me',
  options = { 
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true      
    },
    withCredentials: true
}} = {}) {

  const fetcher = async () => {
      const url = `${protocol}://${host}:${port}/${api}/${route}`
      return axios
          .get(url, options)
              .then(response => response.data)
               
  } 
  return {fetcher}
}




// export type GetRequest = AxiosRequestConfig | null

// interface Return<Data, Error>
//   extends Pick<
//     SWRResponse<AxiosResponse<Data>, AxiosError<Error>>,
//     'isValidating' | 'error' | 'mutate'
//   > {
//   data: Data | undefined
//   response: AxiosResponse<Data> | undefined
// }

// export interface Config<Data = unknown, Error = unknown>
//   extends Omit<
//     SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>,
//     'fallbackData'
//   > {
//   fallbackData?: Data
// }

// export default function useRequest<Data = unknown, Error = unknown>(
//   request: GetRequest,
//   { fallbackData, ...config }: Config<Data, Error> = {}
// ): Return<Data, Error> {
//   const {
//     data: response,
//     error,
//     isValidating,
//     mutate
//   } = useSWR <AxiosResponse<Data>, AxiosError<Error>>(
//     request && JSON.stringify(request),
//     /**
//      * NOTE: Typescript thinks `request` can be `null` here, but the fetcher
//      * function is actually only called by `useSWR` when it isn't.
//      */
//     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//     () => axios.request<Data>(request!),
//     {
//       ...config,
//       fallbackData: fallbackData && {
//         status: 200,
//         statusText: 'InitialData',
//         // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//         config: request!,
//         headers: {},
//         data: fallbackData
//       }
//     }
//   )

//   return {
//     data: response && response.data,
//     response,
//     error,
//     isValidating,
//     mutate
//   }
// }


