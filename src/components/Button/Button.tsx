import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

interface ButtonProps {
  label: string;
  link?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: "fill" | "outline"; //TODO: Implement variants
}

const Button = (props: ButtonProps) => {
  const { label, link, onClick, type = "button", disabled = false } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.disabled = disabled;
    }
  }, [disabled]);

  return link ? (
    <Link to={link} onClick={onClick} className={styles.button}>
      {label}
    </Link>
  ) : type === "button" ? (
    <div onClick={onClick} className={styles.button}>
      {label}
    </div>
  ) : (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={disabled ? styles.button__disabled : styles.button}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
