import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from "./Navbar.module.scss";
import Button from '../Button/Button';

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
                <div className={styles.navbar__item}>
                    <Button label="Sign Up" link="/signup" />
                </div>
                <div className={styles.navbar__item}>
                    <Button label="Login" link="/login" />
                </div>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar