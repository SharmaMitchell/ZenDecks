import React from "react";
import styles from "./Hero.module.scss";
import Flashcard from "../Flashcard/Flashcard";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.hero__text}>
        <h1>Flash</h1>
        <h2>Effortless Flashcards</h2>
        <ul>
          <li>Free and Open Source</li>
          <li>100% Ad-free with No paywalls</li>
          <li>Import from Quizlet, Anki, Excel, and more</li>
        </ul>
      </div>
      <Flashcard
        front="What is the **best** flashcard app?"
        back="***Flash***, a free and open source flashcard app, 
          created by [Mitchell Sharma](https://mitchellsharma.com)"
      />
    </div>
  );
};

export default Hero;
