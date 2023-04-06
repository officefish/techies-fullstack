import ForgotPasswordForm from "@components/screens/auth/forms/forgot-password.form"
import { WithLayout, NextPageWithLayout } from "@utilities/layout.types"
import Layout from "@components/layout/Layout"

import { FormProps } from "@/client/utilities/form.types"
import zodToJsonSchema from "zod-to-json-schema"

const ForgotPasswordPage: WithLayout<FormProps> = ({schema}) => {
  return (
    <ForgotPasswordForm  />
  )
}
export default ForgotPasswordPage


export const getStaticProps = async () => {
    const schema = ""
    return { props: {
            schema
        }
    }
} 

ForgotPasswordPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout title="Request Password.">
      {page}
    </Layout>
  )
}