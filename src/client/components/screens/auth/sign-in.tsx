import { FC } from "react"

import Layout from "@components/layout/Layout"
import SignInForm from "./forms/sign-in-form"

import { useSignIn } from "@services/auth.service"

type Props = {}

const SignIn: FC = (props: Props) => {
    
    const {onSubmit, serverError} = useSignIn()

    return (
        <Layout>
            <div className="container mx-auto mt-8 p-4 flex flex-col items-center font-display">  
                <SignInForm  onSubmit={onSubmit} serverError={serverError}/>
            </div>               
        </Layout>
  )
}

export default SignIn