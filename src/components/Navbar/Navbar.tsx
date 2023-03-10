import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import Button from "../Button/Button";
// import Hamburger from "../Hamburger/Hamburger";
import { Squash as HamburgerButton } from "hamburger-react";
import { motion } from "framer-motion";

interface NavbarProps {
  switchTheme: () => void;
  theme: string;
}

const Navbar = (props: NavbarProps) => {
  const { switchTheme } = props;
  const [isOpen, setOpen] = useState(false);

  const paths = [
    { link: "/", label: "Home" },
    { link: "/about", label: "About" },
    { link: "/demo", label: "Demo" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: -64 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logo}>
          Flashy
        </Link>
        <ul className={styles.navbar__list}>
          {paths.map((path) => (
            <li className={styles.navbar__item} key={path.link}>
              <Link to={path.link} className={styles.navbar__link}>
                {path.label}
              </Link>
            </li>
          ))}
          <div className={styles.navbar__item}>
            <Button label="Sign Up" link="/signup" />
          </div>
          <div className={styles.navbar__item}>
            <Button label="Login" link="/login" />
          </div>
          <div className={styles.navbar__item}>
            <Button label="Theme" onClick={switchTheme} />
          </div>
        </ul>
        <div className={styles.hamburgerbutton}>
          <HamburgerButton
            toggled={isOpen}
            toggle={setOpen}
            color={"var(--menu-font)"}
          />
        </div>
      </nav>
      {isOpen && (
        <div className={styles.hamburger}>
          <ul className={styles.hamburger__list}>
            {paths.map((path) => (
              <li className={styles.hamburger__item} key={path.link}>
                <Link to={path.link} className={styles.navbar__link}>
                  {path.label}
                </Link>
              </li>
            ))}
            <div className={styles.hamburger__item}>
              <Button label="Sign Up" link="/signup" />
            </div>
            <div className={styles.hamburger__item}>
              <Button label="Login" link="/login" />
            </div>
            <div className={styles.hamburger__item}>
              <Button label="Theme" onClick={switchTheme} />
            </div>
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default Navbar;
