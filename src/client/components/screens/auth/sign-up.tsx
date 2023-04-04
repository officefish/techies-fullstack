import { FC } from "react"

import SignUpForm from "./forms/sign-up-form"
import {useSignUp} from '@services/auth.service'

type Props = {}
const SignUp: FC = (props: Props) => {

    const {onSubmit, serverError} = useSignUp()

    return (
        <div className="container mx-auto mt-8 p-4 flex flex-col items-center font-display">  
            <SignUpForm onSubmit={onSubmit} serverError={serverError} />
        </div>               
    )
}

export default SignUp