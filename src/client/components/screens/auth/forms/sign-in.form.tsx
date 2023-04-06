import { FC } from "react"
import { useForm } from 'react-hook-form'
import Link from "next/link"
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignIn } from "@services/auth.service"
import { GetSignInStatic } from "./ssr"
import { FormProps } from "@utilities/form.types"


//import {z} from 'zod'

// const email = {
//     email: z.string({
//         required_error: 'Email is required',
//         invalid_type_error: 'Email must be a string',
//     })
//     .email({ message: "Invalid email address" })
// }
// const password = {
//     password: z.string({
//         required_error: 'Password is required',
//         invalid_type_error: 'Password must be a string',
//     })
//     .min(8, { message: "Must be 8 or more characters long" })
// }

// const loginUserSchema = z.object({
//     ...email,
//     ...password,
// })

const SignInForm: FC<FormProps> = ({schema} : FormProps) => {
    const title = 'Sign In'

    console.log(schema)

    const {onSubmit, serverError} = useSignIn()

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(schema),
    })

    return (
        <div className="dev_form">
            <h2>{title}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="email">
                        Email
                    </label>
                    <input {...register('email')} 
                    id="email" type="text" placeholder="valid email" 
                    className={`
                    ${errors.email && 'invalid'}
                    `}/>
                    {errors.email?.message && 
                        <p>{errors.email?.message?.toString()}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password">
                        Password
                    </label>
                    <input {...register('password')} 
                    id="password" type="text" placeholder="any password"
                    className={`
                        ${errors.password && 'invalid'}
                    `}/>
                    {errors.password?.message && 
                        <p>{errors.password?.message?.toString()}</p>}
                </div>
                <div className="submit_wrapper">
                    <button type="submit">
                        {title}
                    </button>
                </div>
                <div className="flex items-center justify-between">
                <Link className="link" href="/auth/sign-up">
                    No Account?
                </Link>        
                <Link className="link" href="/auth/forgot-password">
                    Forgot Password?
                </Link>
                </div>
            </form>
            <p className="copyright"></p>

            {serverError?.message && 
                <p className="server_error">{serverError.message?.toString()}</p>}  
        </div>
 
           
  )
}

export default SignInForm
export const getStaticProps = GetSignInStatic()