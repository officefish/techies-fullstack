import { FC } from "react"

//import styles from '@/assets/scss/Home.module.scss'
import Layout from "@components/layout/Layout"
import SignInForm from "./forms/sign-in-form"

type Props = {}

const SignIn: FC = (props: Props) => {
  const onSubmit = async (data:any) => {
    console.log(data)
}

return (
    <Layout>
        <div className="container mx-auto mt-8 p-4 flex flex-col items-center font-display">  
            <SignInForm onSubmit={onSubmit} />
        </div>               
    </Layout>
)
}

export default SignIn