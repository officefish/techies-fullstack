//import fs from 'fs'
// import { loginUserSchema } from "@/client/schemas"
// import { registerUserSchema } from "@/client/schemas"
// import { GetStaticProps } from "next"
import { FormProps } from "@utilities/form.types"
import { GetStaticPropsResult } from "next"

import { $ref } from '@/modules/user/user.schema'

export const GetForgotPasswordStatic = () => async (): Promise<GetStaticPropsResult<FormProps>> => {
    //fs
    //const str = JSON.stringify($ref('forgotPasswordSchema'))
    const str = 'ku'
    console.log(str)
    return { props: {
            //fs: Object.keys(fs).join(' '),
            schema: str
        }
    }
}

export const GetSignInStatic = () => async (): Promise<GetStaticPropsResult<FormProps>> => {
      return { props: {
        //fs: Object.keys(fs).join(' '),
        schema: ""//structuredClone(loginUserSchema)
      } }
}

export const GetSignUpStatic = () => async (): Promise<GetStaticPropsResult<FormProps>> => {
    return { props: {
        //fs: Object.keys(fs).join(' '),
        schema: ""//structuredClone(registerUserSchema)
    } }
}
  