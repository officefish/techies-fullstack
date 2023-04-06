import { FC } from "react"
import { FormProps } from "@utilities/form.types"
import FormField from "@components/form/field"
import SubmitButton from "@components/form/button"

const ForgotPasswordForm : FC<FormProps> = ({title, register, handleSubmit, submitHandler, errors}) => {
    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <FormField title='Email' register={register} errors={errors} />
            <SubmitButton title={title} />
            <div className="spacer"></div>
        </form>
   )
}

export default ForgotPasswordForm
