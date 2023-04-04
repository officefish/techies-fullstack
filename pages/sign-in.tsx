import SignIn from "@components/screens/auth/sign-in"
import { NextPageWithLayout } from "@/client/utilities/layout.utilite"
import Layout from "@/client/components/layout/Layout"

const SignInPage: NextPageWithLayout = () => {
  return (
    <SignIn />
  )
}
export default SignInPage

SignInPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout title="Sign Up.">
      {page}
    </Layout>
  )
}