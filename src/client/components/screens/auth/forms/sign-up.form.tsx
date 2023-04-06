import { FC } from "react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProps } from "@utilities/form.types"
import {useSignUp} from '@services/auth.service'
import { GetSignUpStatic } from "./ssr"
import { InferGetStaticPropsType } from 'next'
import { GetStaticProps } from "next"


// import {z} from 'zod'


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
// const name = {
//     name: z.string()
//         .min(7, {message: "Must be 7 or more characters long"})
//         .max(24, {message: "Must be 24 or less characters long"})
//         .optional()
// }

// const registerUserSchema = z.object({
//     ...email,
//     ...password,
//     ...name,
// })

// interface FormProps {
//     schema: any
// }

const SignUpForm: FC<FormProps> = ({schema} : FormProps) => {
    const title = 'Sign Up'
    const {onSubmit, serverError} = useSignUp()

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(schema),
    })

    return (
        <div className="dev_form">
            <h2>{title}</h2>
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
            </form>
            <p className="copyright"></p> 
            {serverError?.message && 
                <p className="server_error">{serverError.message?.toString()}</p>}    
        </div>
 
           
  )
}

export default SignUpForm
export const getStaticProps = GetSignUpStatic()

// export const getStaticProps: GetStaticProps<FormProps> = async () => {
//     return {
//       props: {
//         schema: '',
//       },
//     }
// }