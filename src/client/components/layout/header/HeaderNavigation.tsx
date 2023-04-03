import Link from "next/link"
import { FC } from "react"

import styles from './Header.module.scss'

const HeaderNavigation:FC = () => {
    return( 
        <nav className={styles.header_navbar}>
            <Link className='mr-2 hidden xl:flex hover:text-cyan-500 cursor-pointer' href='/about-us'>About us.</Link>
            <Link className='mr-2 hidden md:flex hover:text-cyan-500 cursor-pointer' href='/contact-us'>Contact us.</Link>
            <Link className='mr-2 hidden lg:flex hover:text-cyan-500 cursor-pointer' href='/studing'>Studing with us.</Link>
            <Link className='mr-2 hidden md:flex hover:text-cyan-500 cursor-pointer' href='/donation'>Support us.</Link>
            <Link className='mx-2 hover:text-cyan-500 cursor-pointer' href='/sign-in'>Sign In.</Link>
        </nav>
    )
}

export default HeaderNavigation