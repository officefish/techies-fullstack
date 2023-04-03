import SignIn from "@components/screens/auth/sign-up"
//import { GetServerSideProps } from 'next'
import { NextPage } from "next"

type SignUpContextInput = {}

const SignUpPage: NextPage<{data: SignUpContextInput}> = ({ data }) => {
  return (
    <SignIn />
  )
}

export default SignUpPage

// export const getServerSideProps: GetServerSideProps = async (context) => {  
//   console.log(context)
//   const data = {}
//   return { props: { data } }
// }
