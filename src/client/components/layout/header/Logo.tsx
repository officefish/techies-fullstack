import { FC, MouseEvent } from "react"

import styles from './Header.module.scss'
import { useRouter } from "next/router"

const Logo:FC = () => {
    const router = useRouter()
    const href = '/'

    const handleClick = (e:MouseEvent) => {
        e.preventDefault()
        router.push(href)
    }

    return( 
        <section onClick={handleClick} className={`${styles.logo_wrapper} sliced_wrapper`}>
            <div className={`${styles.logo_top} sliced_top`}>Techies.</div>
            <div className={`${styles.logo_bottom} sliced_bottom`} aria-hidden="true">Techies.</div>
        </section> 
    )
}

export default Logo