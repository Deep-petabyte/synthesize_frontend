import React, { useState, useRef } from 'react'
import styles from './Toolbar.module.scss'
import Logo from '../Logo/Logo'
import { Link } from 'react-router-dom'
const Toolbar = () => {

    const [click, setClick] = useState(false)

    const navRef = useRef()
    const closeRef = useRef()
    const navBackdropRef = useRef()

    const menuHandler = () => {
        setClick(true)

        const nav = navRef.current
        const close = closeRef.current
        const navBackdrop = navBackdropRef.current


        nav.classList.remove(styles.slide_out)
        nav.classList.add(styles.slide_in)
        nav.addEventListener('animationend', () => {
            nav.style.left = '0';
            close.classList.add(styles.active)
            navBackdrop.classList.add(styles.active)
        })
    }

    const closeHandler = () => {
        setClick(false)

        const nav = navRef.current
        const close = closeRef.current
        const navBackdrop = navBackdropRef.current

        close.classList.remove(styles.active)

        nav.classList.remove(styles.slide_in)
        nav.classList.add(styles.slide_out)
        nav.addEventListener('animationend', () => {
            nav.style.left = '-25rem';
            close.classList.remove(styles.active)
            navBackdrop.classList.remove(styles.active)
        })
    }

    return (
        <>
            <div className={styles.toolbar}>
                <div>
                    <Logo />
                </div>
                <span className="material-icons" onClick={menuHandler}>menu</span>
            </div>

            <div onClick={closeHandler} className={styles.navigation_backdrop} ref={navBackdropRef}></div>

            <nav className={styles.navigationWrapper} ref={navRef}>
                <div className={styles.navigation}>
                    <div className={styles.navigation_logo}>
                        <Logo />
                    </div>

                    <div className={styles.navigation_links}>
                        <Link to={'/'}>
                            <span className="material-icons"> home </span><label>Home</label>
                        </Link>
                        <Link to={'/dj'}>
                            <span className="material-icons"> album </span><label>Dj</label>
                        </Link>
                    </div>
                </div>
                <div onClick={closeHandler}>
                    <div className={styles.navigation_close} ref={closeRef}>
                        <span className="material-icons">close</span>
                    </div>
                </div>
            </nav>
        </>

    )
}

export default Toolbar