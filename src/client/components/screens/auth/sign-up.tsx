import { FC } from "react"

import SignUpForm from "./forms/sign-up.form"

const SignUp: FC = () => {
    return (
        <div className="container mx-auto mt-8 p-4 flex flex-col items-center font-display">  
            <SignUpForm />
        </div>               
    )
}
export default SignUp