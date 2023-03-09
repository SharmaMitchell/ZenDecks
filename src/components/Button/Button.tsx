import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./Button.module.scss";

interface ButtonProps {
    label: string;
    link?: string;
    onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  const { label, link = '', onClick } = props;
  return (
    <Link to={link} onClick={onClick} className={styles.button}>{label}</Link>
  )
}

export default Button