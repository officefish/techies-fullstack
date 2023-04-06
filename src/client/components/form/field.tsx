import { FC } from "react"
import { FormFieldProps } from "@utilities/form.types"

const FormField : FC<FormFieldProps> = ({title, placeholder, register, errors}) => {
    const tag = title.toLowerCase()
    return (
        <div className="mt-4">
            <label htmlFor={tag}>
                {title}
            </label>
            <input {...register(tag)} 
            id={tag} type="text" placeholder={(placeholder ? placeholder : `valid ${tag}`)} 
            className={`
            ${errors[tag] && 'invalid'}
            `}/>
            {errors[tag]?.message && 
                <p>{errors[tag]?.message?.toString()}</p>}
        </div>   
   )
}

export default FormField