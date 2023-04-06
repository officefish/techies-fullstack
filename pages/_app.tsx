import '@assets/scss/globals.scss'
import type { AppProps } from 'next/app'
import localFont from 'next/font/local'
import { NextPageWithLayout } from '@utilities/layout.types'



type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)
  return getLayout(
    <main>
        <Component {...pageProps} />
    </main>)
}