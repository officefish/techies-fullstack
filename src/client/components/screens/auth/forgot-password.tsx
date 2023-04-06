import { FC, useEffect } from "react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {z} from 'zod'
import { useForgotPassword } from "@services/user.service"
import ForgotPasswordForm from "./forms/forgot-password.form"
import { useState } from "react"
import Link from "next/link"

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

type ReplyWithStatus = {
    status: string
}

const ForgotPassword : FC = () => {

    const [email, setEmail] = useState('')

    const {onSubmit, reply, serverError} = useForgotPassword<ReplyWithStatus>({setEmail})
    const [isSent, setIsSent] = useState(false)
    
    const title = 'Request password'
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(schema),
    })

    useEffect(() => {
        if (reply && reply.status === 'ok') {
            setIsSent(true)            
        }
    }, [reply])

    return (
        <div className="dev_form_layout"> 
            <div className="dev_form">
                <h2>{title}</h2>
                {isSent? (
                    <div className="no_form">
                        <p>
                            Reset password instruction sent to: <span>{email}</span>
                        </p>
                        <div className="flex items-center justify-center">
                            <Link className="link" href="/auth/sign-in">
                                Try sign in?
                            </Link>
                        </div>
                    </div>
                ) : (
                    <ForgotPasswordForm 
                    title={title}
                    register={register}
                    handleSubmit={handleSubmit}
                    submitHandler={onSubmit}
                    errors={errors}
                 />
                )}
                <p className="copyright"></p> 
                {serverError?.message && 
                    <p className="server_error">{serverError.message?.toString()}</p>}    
            </div>
        </div>
  )
}

export default ForgotPassword
