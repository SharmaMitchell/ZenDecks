import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <h1>Flashy</h1>
      <h2>Effortless Flashcards</h2>
      <div className={styles.footer__infolinks}>
        <p>
          Created by{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/SharmaMitchell"
          >
            Mitchell Sharma
          </a>
          , 2023. Open source on{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/SharmaMitchell/Flashy"
          >
            GitHub
          </a>
          .
        </p>
        <p>
          Licensed under{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/SharmaMitchell/Flashy#license"
          >
            CC BY-NC-ND 4.0
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Footer;
