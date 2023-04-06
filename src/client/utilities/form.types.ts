import { 
    FieldErrors, 
    FieldValues,
    SubmitHandler,
    SubmitErrorHandler,
    UseFormRegister,
    UseFormHandleSubmit
} from "react-hook-form"
export interface FormProps {
    title: string
    handleSubmit: UseFormHandleSubmit<FieldValues>
    submitHandler: SubmitHandler<FieldValues> 
    register: UseFormRegister<FieldValues>
    errors: FieldErrors<FieldValues>
}

export interface FormFieldProps {
    title: string
    placeholder?: string,
    register: UseFormRegister<FieldValues>
    errors: FieldErrors<FieldValues>
}

export interface SubmitButtonProps {
    title: string
}



