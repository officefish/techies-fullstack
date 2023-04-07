import { FC } from "react"
import { FormTokenProps } from "@utilities/form.types"
import FormField from "@components/form/field"
import SubmitButton from "@components/form/button"
import HiddenFormField from "@components/form/hidden.field"

const PasswordResetForm : FC<FormTokenProps> = ({   title, 
    register, 
    handleSubmit, 
    submitHandler, 
    errors,
    email,
    expires,
    token
}) => {
    
    console.log(email, expires, token)
    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <FormField title='Password' 
                register={register} errors={errors} />
            <HiddenFormField 
                title='Email' value={email} 
                register={register} errors={errors} />
            <HiddenFormField 
                title='Expires' value={expires} 
                register={register} errors={errors} />
            <HiddenFormField 
                title='Token' value={token} 
                register={register} errors={errors} />
            <SubmitButton title={title} />
            <div className="spacer"></div>
        </form>
   )
}

export default PasswordResetForm