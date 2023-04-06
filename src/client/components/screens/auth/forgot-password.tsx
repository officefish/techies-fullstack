import { FC, useEffect } from "react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {z} from 'zod'
import { useForgotPassword } from "@services/user.service"
import ForgotPasswordForm from "./forms/forgot-password.form"

const email = {
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    })
    .email({ message: "Invalid email address" })
}

const schema = z.object({
    ...email
})

const ForgotPassword : FC = () => {

    const {onSubmit, reply, serverError} = useForgotPassword()
    
    const title = 'Request password'
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(schema),
    })

    useEffect(() => {
        console.log(reply)
    }, [reply])

    return (
        <div className="container mx-auto mt-8 p-4 flex flex-col items-center font-display"> 
            <div className="dev_form">
                <h2>{title}</h2>
                <ForgotPasswordForm 
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

export default ForgotPassword
