import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./Button.module.scss";

interface ButtonProps {
    label: string;
    link: string;
}

const Button = (props: ButtonProps) => {
  const { label, link } = props;
  return (
    <Link to={link} className={styles.button}>{label}</Link>
  )
}

export default Button