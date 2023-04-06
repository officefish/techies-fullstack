import SignUp from "@components/screens/auth/sign-up"
import { NextPageWithLayout } from "@utilities/layout.types"
import Layout from "@components/layout/Layout"

const SignUpPage: NextPageWithLayout = () => {
  return (
    <SignUp />
  )
}
export default SignUpPage

SignUpPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout title="Sign Up.">
      {page}
    </Layout>
  )
}


