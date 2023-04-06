import { FC } from "react"
import { SubmitButtonProps } from "@utilities/form.types"

const SubmitButton : FC<SubmitButtonProps> = ({title}) => {
    return (
        <div className="submit_wrapper">
            <button type="submit">
                {title}
            </button>
        </div>
   )
}

export default SubmitButton