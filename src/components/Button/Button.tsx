import React from 'react'
import styles from "./Button.module.scss";

interface ButtonProps {
    label: string;
    link: string;
}

const Button = (props: ButtonProps) => {
  const { label, link } = props;
  return (
    <a href={link} className={styles.button}>{label}</a>
  )
}

export default Button