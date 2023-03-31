import { FC } from "react"
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const validationSchema = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    })
        .min(7, {message: "Must be 7 or more characters long"})
        .max(24, {message: "Must be 24 or less characters long"})

    , email: z.string({
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

const SignInForm: FC<any> = (props: Props) => {

    const {onSubmit} = props

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(validationSchema),
    })

    return (
        <div className="dev_form">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="name">
                        Nickname
                    </label>
                    <input {...register('name')} 
                    id="name" type="text" placeholder="any name" 
                    className={`
                    ${errors.name && 'invalid'}
                    `}/>
                    {errors.name?.message && 
                        <p>{errors.name?.message?.toString()}</p>}
                </div>
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
                        Sign In
                    </button>
                </div>
            </form>
            <p className="copyright"></p>   
        </div>
 
           
  )
}

export default SignInForm