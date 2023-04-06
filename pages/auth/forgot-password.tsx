import ForgotPassword from "@components/screens/auth/forgot-password"
import { NextPageWithLayout } from "@utilities/layout.types"
import Layout from "@components/layout/Layout"


const ForgotPasswordPage: NextPageWithLayout = () => {
  return (
    <ForgotPassword />
  )
}
export default ForgotPasswordPage

ForgotPasswordPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout title="Request Password.">
      {page}
    </Layout>
  )
}