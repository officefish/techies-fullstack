import SignUp from "@components/screens/auth/sign-up"
import { NextPageWithLayout } from "@/client/utilities/layout.utilite"
import Layout from "@/client/components/layout/Layout"

const SignUpPage: NextPageWithLayout = () => {
  return (
    <SignUp />
  )
}
export default SignUpPage

SignUpPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout title="Sign In.">
      {page}
    </Layout>
  )
}


