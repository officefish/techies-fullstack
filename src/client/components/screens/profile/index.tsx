import { FC } from "react"

import Layout from "@components/layout/Layout"
import { useUser } from "@services/user.service"

type Props = {}

const Profile: FC = (props: Props) => {
  const {user, mutate} = useUser()

  return (
    <Layout>
        <div className="container mx-auto mt-8 p-4 flex flex-col items-center">  
                Profile
              {user && 
                <div>
                  <p>{user.email}</p> 
                  <p>{user.id}</p> 
                  <p>{user.authenticated.toString()}</p>  
                  <p>{user.role}</p>
                </div>
              }
            </div>   
    </Layout>
  )
}

export default Profile