import { FC } from "react"

import Layout from "@components/layout/Layout"
import SignUpForm from "./forms/sign-up-form"

import {useSignUp} from '@services/auth.service'

type Props = {}

const SignUp: FC = (props: Props) => {

    const {onSubmit, serverError} = useSignUp()

    return (
        <Layout>
            <div className="container mx-auto mt-8 p-4 flex flex-col items-center font-display">  
                <SignUpForm onSubmit={onSubmit} serverError={serverError} />
            </div>               
        </Layout>
    )
}

export default SignUp