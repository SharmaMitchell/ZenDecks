import React, { useState } from "react";
import styles from "./DropdownMenu.module.scss";
import { motion } from "framer-motion";

type MenuProps = {
  children: React.ReactNode;
  toggleButton: JSX.Element;
  isNavMenu?: boolean;
};

export const DropdownMenu = ({
  children,
  toggleButton,
  isNavMenu,
}: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // Create a new component that handles onClick event on the toggleButton element
  const ToggleButtonWrapper = () => {
    return React.cloneElement(toggleButton, {
      onClick: handleClick, // set the onClick event on the cloned toggleButton element
    });
  };

  return (
    <div className={styles.dropdown}>
      <ToggleButtonWrapper />
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: +20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className={
            styles.dropdown__content +
            " " +
            (isNavMenu ? styles.dropdown__content__menu : "")
          }
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

type ItemProps = {
  children: React.ReactNode;
};

export const DropdownItem = ({ children }: ItemProps) => {
  return <div className={styles.dropdown__item}>{children}</div>;
};
