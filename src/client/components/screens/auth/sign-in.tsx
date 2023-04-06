import { FC } from "react"
import SignInForm from "./forms/sign-in.form"

const SignIn: FC = () => {
    
    

    return (
        <div className="container mx-auto mt-8 p-4 flex flex-col items-center font-display">  
            <SignInForm />
        </div>
    )
}

export default SignIn