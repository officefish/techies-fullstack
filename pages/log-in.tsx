import Login from "@components/screens/auth/log-in"
import { GetServerSideProps } from 'next'
import { NextPage } from "next"

type LoginContextInput = {}

const LoginPage: NextPage<{data:LoginContextInput}> = ({ data }) => {
  return (
    <Login />
  )
}

export default LoginPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context)
  
  const data = {}
  return { props: { data } }
}
