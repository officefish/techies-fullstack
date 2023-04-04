import Profile from "@components/screens/profile"
import { NextPageWithLayout } from "@utilities/layout.utilite"
import Layout from "@components/layout/Layout"

const ProfilePage: NextPageWithLayout = () => {
  return (
    <Profile />
  )
}
export default ProfilePage

ProfilePage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout title="Profile">
      {page}
    </Layout>
  )
}
