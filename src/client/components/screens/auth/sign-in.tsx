import { FC } from "react"

import Layout from "@components/layout/Layout"
import SignInForm from "./forms/sign-in-form"

import { useSignIn } from "@services/auth.service"

type Props = {}

const SignIn: FC = (props: Props) => {
    
    const {onSubmit, serverError} = useSignIn()

    return (
        <div className="container mx-auto mt-8 p-4 flex flex-col items-center font-display">  
            <SignInForm  onSubmit={onSubmit} serverError={serverError}/>
        </div>
    )
}

export default SignIn