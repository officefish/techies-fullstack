//import '@/assets/scss/globals.scss'
import type { AppProps } from 'next/app'

// import localFont from 'next/font/local'

// const oldEnglish = localFont({ src: [
//   {
//     path: '../../public/fonts/old-english/EngraversOldEnglish-Med.otf',
//     weight: '400',
//     style: 'normal',
//   },
//   {
//     path: '../../public/fonts/old-english/EngraversOldEnglish-Bd.otf',
//     weight: '400',
//     style: 'bold',
//   }
// ], variable: '--font-old-english' })

export default function App({ Component, pageProps }: AppProps) {
  return (
  <main>
    <Component {...pageProps} />
  </main>)
}
