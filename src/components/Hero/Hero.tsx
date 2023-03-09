import React from "react";
import styles from "./Hero.module.scss";
import Flashcard from "../Flashcard/Flashcard";
import Tilt from "react-parallax-tilt";

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
      <Tilt
        tiltMaxAngleX={4}
        tiltMaxAngleY={10}
        scale={1.025}
        tiltAngleYInitial={10}
        tiltAngleXInitial={0}
      >
        <Flashcard
          front="What is the **best** flashcard app?"
          back="***Flash***, a free and open source flashcard app, 
          created by [Mitchell Sharma](https://mitchellsharma.com)"
        />
      </Tilt>
    </div>
  );
};

export default Hero;
