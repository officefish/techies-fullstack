import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

export type WithLayout<T = {}> = NextPage<T> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}
