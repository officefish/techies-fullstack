import type { NextPage } from 'next'

export type NextPageWithLayout<T = {}> = NextPage<T> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}
