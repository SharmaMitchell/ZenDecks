import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <div>
        <nav className={styles.navbar}>
            <Link to="/" className={styles.logo}>Flow</Link>
            <ul className={styles.navbar__list}>
                <li className={styles.navbar__item}>
                    <Link to="/" className={styles.navbar__link}>Home</Link>
                </li>
                <li className={styles.navbar__item}>
                    <Link to="/about" className={styles.navbar__link}>About</Link>
                </li>
                <li className={styles.navbar__item}>
                    <Link to="/demo" className={styles.navbar__link}>Demo</Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar