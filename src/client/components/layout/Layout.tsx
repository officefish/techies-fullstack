import { FC, PropsWithChildren } from "react"
import Header from "./header/Header"
import Meta, {IMeta} from "../seo"

const Layout:FC<PropsWithChildren<IMeta>> = ({title, description, children}) => {
    return (
        <Meta title={title} description={description}>
            <Header />
            {children}
        </Meta>
    )
}

export default Layout