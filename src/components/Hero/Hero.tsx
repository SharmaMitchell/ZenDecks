import React from "react";
import styles from "./Hero.module.scss";
import Flashcard from "../Flashcard/Flashcard";
import Button from "../Button/Button";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className={styles.hero} id="home">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.25,
          opacity: { ease: "easeIn" },
          y: { ease: "easeOut" },
        }}
        className={styles.hero__text}
      >
        <h1>Flash</h1>
        <h2>Effortless Flashcards</h2>
        <ul>
          <li>Free and Open Source</li>
          <li>100% Ad-free with No paywalls</li>
          <li>Import from Quizlet, Anki, Excel, and more</li>
        </ul>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.2 }}
          className={styles.hero__buttons}
        >
          <div className={styles.hero__button}>
            <Button label="Get Started" link="/signup" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.1 }}
            className={styles.hero__button}
          >
            <Button label="Learn More" link="/#about" />
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.1 }}
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
            back="***Flash***, a free and open source flashcard app, 
          created by [Mitchell Sharma](https://mitchellsharma.com)"
          />
        </Tilt>
      </motion.div>
    </div>
  );
};

export default Hero;
