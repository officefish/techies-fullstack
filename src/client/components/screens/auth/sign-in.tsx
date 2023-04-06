import { FC } from "react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignIn } from "@services/auth.service"
import {z} from 'zod'
import SignInForm from "./forms/sign-in.form"

const email = {
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    })
    .email({ message: "Invalid email address" })
}
const password = {
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
    })
    .min(8, { message: "Must be 8 or more characters long" })
}

const schema = z.object({
    ...email,
    ...password,
})

const SignIn: FC = () => {
    const title = 'Sign In'

    const {onSubmit, serverError} = useSignIn()

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(schema),
    })

    return (
        <div className="dev_form_layout"> 
            <div className="dev_form">
                <h2>{title}</h2>
                <SignInForm 
                    title={title}
                    register={register}
                    handleSubmit={handleSubmit}
                    submitHandler={onSubmit}
                    errors={errors}
                />
                <p className="copyright"></p>
                {serverError?.message && 
                    <p className="server_error">{serverError.message?.toString()}</p>}  
            </div> 
        </div>         
  )
}
export default SignIn
