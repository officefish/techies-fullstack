import { FC } from "react"
import { FormProps } from "@utilities/form.types"
import FormField from "@components/form/field"
import SubmitButton from "@components/form/button"

const SignUpForm: FC<FormProps> = ({title, register, handleSubmit, submitHandler, errors}) => {
    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <FormField title='Name' register={register} errors={errors} />
            <FormField title='Email' register={register} errors={errors} />
            <FormField title='Password' register={register} errors={errors} />
            <SubmitButton title={title} />
        </form>
    )
}
export default SignUpForm
