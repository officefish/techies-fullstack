import { FC, useEffect } from "react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProps } from "@utilities/form.types"
import {z} from 'zod'
import { useForgotPassword } from "@services/user.service"

//import { buildForgotPasswordSchema } from "@/schemas"
//import { InferGetStaticPropsType } from 'next'

const email = {
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    })
    .email({ message: "Invalid email address" })
}

const nSchema = z.object({
    ...email
})

//const nSchema = buildForgotPasswordSchema()

const ForgotPasswordForm : FC<FormProps> = ({schema}) => {

    const {onSubmit, reply, serverError} = useForgotPassword()
    
    const title = 'Request password'
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(nSchema),
    })

    useEffect(() => {
        console.log(reply)
    }, [reply])

    return (
        <div className="container mx-auto mt-8 p-4 flex flex-col items-center font-display"> 
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
        </div>
  )
}

export default ForgotPasswordForm
