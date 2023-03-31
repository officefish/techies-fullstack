import { FC } from "react"
import { useForm } from 'react-hook-form'

import Link from "next/link"

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const validationSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    })
        .email({ message: "Invalid email address" })
    
    , password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    })
        .min(8, { message: "Must be 8 or more characters long" })
})

type Props = {
    onSubmit: (data: any) => void
}

const LogInForm: FC<any> = (props: Props) => {

    const {onSubmit} = props

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(validationSchema),
    })

    return (
        <div className="dev_form">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="email">
                        Email
                    </label>
                    <input {...register('email')} 
                    id="email" type="text" placeholder="**@**.***" 
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
                    id="password" type="text" placeholder="ლ(ヘᴥヘ)ლ"
                    className={`
                        ${errors.password && 'invalid'}
                    `}/>
                    {errors.password?.message && 
                        <p>{errors.password?.message?.toString()}</p>}
                </div>
                <div className="submit_wrapper">
                    <button type="submit">
                        Log In
                    </button>
                </div>
                <div className="flex items-center justify-between">
                <Link className="link" href="/sign-in">
                    No Account?
                </Link>        
                <Link className="link" href="#">
                    Forgot Password?
                </Link>
                </div>
            </form>
            <p className="copyright"></p>   
        </div>
 
           
  )
}

export default LogInForm