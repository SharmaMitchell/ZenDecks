import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import Button from "../Button/Button";
import { Squash as HamburgerButton } from "hamburger-react";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import { motion } from "framer-motion";
import { UserContext } from "../utils/context";
import { ReactComponent as User } from "../../assets/user.svg";
import { ReactComponent as Power } from "../../assets/power.svg";
import { auth } from "../../components/utils/firebase";
import { InnerMoon } from "@theme-toggles/react";
import "@theme-toggles/react/css/InnerMoon.css";

interface NavbarProps {
  switchTheme: () => void;
  theme: string;
}

/**
 * Navbar component, including hamburger menu for mobile
 * @param props - The props object for the Navbar component
 * @param props.switchTheme - The function to switch the theme
 * @param props.theme - The current theme
 * @todo Make the entire link/button area clickable for the mobile hamburger menu
 *       instead of just the text. Add padding to the hamburger menu items?
 * @todo Move theme toggle and logout to a dropdown menu on desktop
 */
const Navbar = (props: NavbarProps) => {
  const { theme, switchTheme } = props;
  const [isOpen, setOpen] = useState(false);

  // Paths for navbar
  const paths = [
    { link: "/", label: "Home" },
    { link: "/about", label: "About" },
    { link: "/decks", label: "Decks" },
    { link: "/create", label: "Create" },
  ];

  // Logged in user
  const { user, username } = useContext(UserContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logo}>
          ZenDecks
        </Link>
        <ul className={styles.navbar__list}>
          {paths.map((path) => (
            <li className={styles.navbar__item} key={path.link}>
              <Link to={path.link} className={styles.navbar__link}>
                {path.label}
              </Link>
            </li>
          ))}
          {/* <li
            className={
              styles.navbar__item + " " + styles.navbar__themetoggle__wrapper
            }
          >
            <div className={styles.navbar__link} onClick={switchTheme}>
              Theme
            </div>
            <InnerMoon
              toggle={switchTheme}
              toggled={theme === "dark"}
              className={styles.navbar__themetoggle}
            />
          </li> */}
          {user ? (
            <>
              <DropdownMenu
                isNavMenu={true}
                toggleButton={
                  <div className={styles.navbar__item}>
                    <div className={styles.navbar__link}>
                      <User fill="currentColor" className={styles.usericon} />
                      {username}
                    </div>
                  </div>
                }
              >
                <li
                  className={
                    styles.navbar__item +
                    " " +
                    styles.navbar__themetoggle__wrapper
                  }
                >
                  <div className={styles.navbar__link} onClick={switchTheme}>
                    Theme
                  </div>
                  <InnerMoon
                    toggle={switchTheme}
                    toggled={theme === "dark"}
                    className={styles.navbar__themetoggle}
                  />
                </li>
                <li className={styles.navbar__item}>
                  <Link to="/account" className={styles.navbar__link}>
                    <User fill="currentColor" className={styles.usericon} />
                    Account
                  </Link>
                </li>
                <li className={styles.navbar__item}>
                  <div
                    className={styles.navbar__link}
                    onClick={() => auth.signOut()}
                  >
                    <Power fill="currentColor" className={styles.usericon} />
                    Log Out
                  </div>
                </li>
              </DropdownMenu>
            </>
          ) : (
            <>
              <li
                className={
                  styles.navbar__item +
                  " " +
                  styles.navbar__themetoggle__wrapper
                }
              >
                <div className={styles.navbar__link} onClick={switchTheme}>
                  Theme
                </div>
                <InnerMoon
                  toggle={switchTheme}
                  toggled={theme === "dark"}
                  className={styles.navbar__themetoggle}
                />
              </li>
              <div className={styles.navbar__item}>
                <Button label="Sign Up" link="/signup" againstcard />
              </div>
              <div className={styles.navbar__item}>
                <Button label="Sign In" link="/login" againstcard />
              </div>
            </>
          )}
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
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.2,
          }}
          className={styles.hamburger}
        >
          <ul className={styles.hamburger__list}>
            {paths.map((path) => (
              <li className={styles.hamburger__item} key={path.link}>
                <Link to={path.link} className={styles.navbar__link}>
                  {path.label}
                </Link>
              </li>
            ))}
            <li
              className={
                styles.hamburger__item +
                " " +
                styles.navbar__themetoggle__wrapper
              }
            >
              <InnerMoon
                toggle={switchTheme}
                toggled={theme === "dark"}
                className={styles.navbar__themetoggle}
              />
              <a className={styles.navbar__link} onClick={switchTheme}>
                Theme
              </a>
            </li>
            {user ? (
              <>
                <div className={styles.hamburger__item}>
                  <Link to="/account" className={styles.navbar__link}>
                    <User fill="currentColor" className={styles.usericon} />
                    {username}
                  </Link>
                </div>
                <li className={styles.hamburger__item}>
                  <div
                    className={styles.navbar__link}
                    onClick={() => auth.signOut()}
                  >
                    <Power fill="currentColor" className={styles.usericon} />
                    Log Out
                  </div>
                </li>
              </>
            ) : (
              <>
                <div className={styles.hamburger__item}>
                  <Button label="Sign Up" link="/signup" againstcard />
                </div>
                <div className={styles.hamburger__item}>
                  <Button label="Sign In" link="/login" againstcard />
                </div>
              </>
            )}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Navbar;
