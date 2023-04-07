import { FC } from "react"
import { TokenProps } from "@utilities/form.types"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// import { useSignIn } from "@services/auth.service"
import {z, ZodTypeAny} from 'zod'
import PasswordResetForm from "./forms/password-reset.form"
import { useResetPassword } from "@services/user.service"
//import { useRouter } from "next/router"

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

const numericString = (schema: ZodTypeAny) => z.preprocess((a) => {
    if (typeof a === 'string') {
      return parseInt(a, 10)
    } else if (typeof a === 'number') {
      return a;
    } else {
      return undefined;
    }
  }, schema)

const schema = z.object({
    ...email,
    ...password,
    expires: numericString(z.number()),
    token: z.string()
})

const PasswordReset: FC<TokenProps> = ({email, expires, token}) => {
    const title = 'New Password'

    const {onSubmit, serverError} = useResetPassword()

    const { register, handleSubmit, formState: { errors }, } = useForm({
         resolver: zodResolver(schema),
    })

    return (
        <div className="dev_form_layout"> 
            <div className="dev_form">
                <h2>{title}</h2>
                <PasswordResetForm 
                    title={title}
                    register={register}
                    handleSubmit={handleSubmit}
                    submitHandler={onSubmit}
                    errors={errors}
                    email={email}
                    expires={expires}
                    token={token}
                />
                <p className="copyright"></p>
                {serverError?.message && 
                    <p className="server_error">{serverError.message?.toString()}</p>}  
            </div> 
        </div>         
  )
}
export default PasswordReset