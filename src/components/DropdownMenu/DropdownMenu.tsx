import React, { useState } from "react";
import styles from "./DropdownMenu.module.scss";
import Button from "../Button/Button";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

export const DropdownMenu = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.dropdown}>
      <Button label="Settings" onClick={handleClick} />
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: +20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className={styles.dropdown__content}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

export const DropdownItem = ({ children }: Props) => {
  return <div className={styles.dropdown__item}>{children}</div>;
};
