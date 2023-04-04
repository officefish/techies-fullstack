import { NextPageWithLayout } from "@utilities/layout.utilite"
import Layout from "@components/layout/Layout"
import Home from "@components/screens/home/home"

const HomePage: NextPageWithLayout = () => {
  return (
    <Home />
  )
}
export default HomePage

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout title="Home" description="Resent posts.">
      {page}
    </Layout>
  )
}

