import React from "react";
import styles from "./Hero.module.scss";
import Flashcard from "../Flashcard/Flashcard";
import Button from "../Button/Button";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

/**
 * Hero component: Displays features and a demo flashcard
 */
const Hero = () => {
  return (
    <div className={styles.hero} id="home">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.2,
          opacity: { ease: "easeIn" },
          y: { ease: "easeOut" },
        }}
        className={styles.hero__text}
      >
        <h1>ZenDecks</h1>
        <h2>Effortless Flashcards</h2>
        <ul>
          <li>Free and Open Source</li>
          <li>100% Ad-free with No paywalls</li>
          <li>Import/Export compatible with Quizlet, Anki, Excel, and more</li>
        </ul>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className={styles.hero__buttons}
        >
          <div className={styles.hero__button}>
            <Button label="Get Started" link="/signup" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className={styles.hero__button}
          >
            <div className={styles.hero__button}>
              <Button label="Learn More" link="/#about" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        className={styles.hero__flashcard}
      >
        <Tilt
          tiltMaxAngleX={4}
          tiltMaxAngleY={10}
          scale={1.025}
          tiltAngleYInitial={10}
          tiltAngleXInitial={0}
        >
          <Flashcard
            front="What is the **best** flashcard app?"
            back="***ZenDecks***, a *free*, *open source* flashcard app.  
          Cards have full **Markdown** and **LaTeX** support, meaning you can format your cards for any subject! 
          - **Math**: $e^{i\pi}+1=0$
          - **Code**: `print(hello world)`
          - **Langauge**: 안녕하세요  
          ... and more!"
            hint={true}
          />
        </Tilt>
      </motion.div>
    </div>
  );
};

export default Hero;
