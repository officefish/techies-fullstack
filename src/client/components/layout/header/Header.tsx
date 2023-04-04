import Link from "next/link"
import { FC } from "react"

import styles from './Header.module.scss'
import { OldEnglish } from "@assets/fonts"
import HeaderNavigation from "./HeaderNavigation"
import Logo from "./Logo"

const Header:FC = () => {
    return( 
    <>
        <header className={`
            ${styles.header_container} 
            ${OldEnglish.className}
        `}>
            <div className='flex items-center justify-end'>
                <Logo />
                <div className={styles.header_description}>
                    <span>Blog</span>
                    <span className='hidden md:inline-flex md:ml-1'>about programming</span> 
                    <span className='hidden lg:inline-flex lg:mx-1' >with software techies and</span><Link
                    className="hidden lg:inline-flex cursor-pointer huver:underline hover:text-cyan-500"
                    href='https://github.com/officefish'>office fish</Link>
                    <span>.</span>
                </div>
            </div>
            <HeaderNavigation />
        </header>
        <div className={styles.header_offset}></div>
    </>
    )
}

export default Header