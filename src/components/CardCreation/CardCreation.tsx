import React from "react";
import styles from "./CardCreation.module.scss";
import Flashcard from "../Flashcard/Flashcard";
import { motion } from "framer-motion";

interface CardCreationProps {
  front: string;
  back: string;
  handleCardChange: (
    index: number,
    field: "front" | "back",
    value: string
  ) => void;
  index: number;
  addCardCallback?: () => void;
}

/**
 * Displays a form for creating a new card
 * @param props - The props object for the CardCreation component
 * @param props.front - The front of the card
 * @param props.back - The back of the card
 * @param props.handleCardChange - Function to pass card changes up to the parent
 * @param props.index - The index of the card in the array of cards
 * @todo Implement button to delete card (add confirmation or undo)
 */

const CardCreation = (props: CardCreationProps) => {
  const { front, back, handleCardChange, index, addCardCallback } = props;

  const handleBackKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      e.key === "Tab" &&
      !e.shiftKey &&
      !e.altKey &&
      !e.ctrlKey &&
      !e.metaKey
    ) {
      e.preventDefault();
      if (addCardCallback) {
        addCardCallback();
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index == 0 ? 0.1 : 0 }}
      className={styles.cardcreation}
    >
      <div className={styles.cardcreation__form}>
        <label
          className={styles.cardcreation__input__label}
          htmlFor={`front-${index}`}
        >
          Front
        </label>
        <textarea
          rows={4}
          name="front"
          id={`front-${index}`}
          placeholder="Front of the card"
          className={styles.cardcreation__input}
          value={front}
          onChange={(e) => handleCardChange(index, "front", e.target.value)}
        />
        <label
          className={styles.cardcreation__input__label}
          htmlFor={`back-${index}`}
        >
          Back
        </label>
        <textarea
          rows={4}
          name="back"
          id={`back-${index}`}
          placeholder="Back of the card"
          className={styles.cardcreation__input}
          value={back}
          onChange={(e) => handleCardChange(index, "back", e.target.value)}
          onKeyDown={addCardCallback ? handleBackKeyDown : undefined}
        />
      </div>
      <div className={styles.cardcreation__preview}>
        <Flashcard front={front} back={back} size={"small"} hint={true} />
      </div>
    </motion.div>
  );
};

export default CardCreation;
