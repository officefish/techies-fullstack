import SignIn from "@components/screens/auth/sign-in"
import { GetServerSideProps } from 'next'
import { NextPage } from "next"

type SignInContextInput = {}

const SignInPage: NextPage<{data:SignInContextInput}> = ({ data }) => {
  return (
    <SignIn />
  )
}

export default SignInPage

export const getServerSideProps: GetServerSideProps = async (context) => {  
  const data = {}
  return { props: { data } }
}
