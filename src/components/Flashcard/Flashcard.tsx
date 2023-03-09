import React, { useState } from "react";
import styles from "./Flashcard.module.scss";

const Flashcard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={styles.flashcard + " " + (isFlipped ? styles.flipped : "")}
      onClick={flipCard}
    >
      <div className={styles.flashcard__front}>
        <h1>Front</h1>
      </div>
      <div className={styles.flashcard__back}>
        <h1>Back</h1>
      </div>
    </div>
  );
};

export default Flashcard;
