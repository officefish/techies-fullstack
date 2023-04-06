import { FC } from "react"
import Link from "next/link"
import { FormProps } from "@utilities/form.types"
import FormField from "@components/form/field"
import SubmitButton from "@components/form/button"

const SignInForm: FC<FormProps> = ({title, register, handleSubmit, submitHandler, errors}) => {
    
    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <FormField title='Email' register={register} errors={errors} />
            <FormField title='Password' register={register} errors={errors} />
            <SubmitButton title={title} />
            <div className="flex items-center justify-between">
                <Link className="link" href="/auth/sign-up">
                    No Account?
                </Link>        
                <Link className="link" href="/auth/forgot-password">
                    Forgot Password?
                </Link>
            </div>
        </form> 
  )
}

export default SignInForm
