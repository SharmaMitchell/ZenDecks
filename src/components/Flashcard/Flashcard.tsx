import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./Flashcard.module.scss";

interface CardProps {
  front?: string;
  back?: string;
}

const Flashcard = (props: CardProps) => {
  const { front = "", back = "" } = props;

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
        <ReactMarkdown linkTarget="_blank">{front}</ReactMarkdown>
      </div>
      <div className={styles.flashcard__back}>
        <ReactMarkdown linkTarget="_blank">{back}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Flashcard;
