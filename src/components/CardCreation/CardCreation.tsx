import React from "react";
import styles from "./CardCreation.module.scss";
import Flashcard from "../Flashcard/Flashcard";
/* 
TODO:
- Implement button to delete card
    - Add confirmation or undo
*/
interface CardCreationProps {
  front: string;
  back: string;
  handleCardChange: (
    index: number,
    field: "front" | "back",
    value: string
  ) => void;
  index: number;
}

const CardCreation = (props: CardCreationProps) => {
  const { front, back, handleCardChange, index } = props;

  return (
    <div className={styles.cardcreation}>
      <div className={styles.cardcreation__form}>
        <label className={styles.cardcreation__input__label} htmlFor="front">
          Front
        </label>
        <textarea
          rows={4}
          name="front"
          id="front"
          placeholder="Front of the card"
          className={styles.cardcreation__input}
          value={front}
          onChange={(e) => handleCardChange(index, "front", e.target.value)}
        />
        <label className={styles.cardcreation__input__label} htmlFor="back">
          Back
        </label>
        <textarea
          rows={4}
          name="back"
          id="back"
          placeholder="Back of the card"
          className={styles.cardcreation__input}
          value={back}
          onChange={(e) => handleCardChange(index, "back", e.target.value)}
        />
      </div>
      <div className={styles.cardcreation__preview}>
        <Flashcard front={front} back={back} size={"small"} />
      </div>
    </div>
  );
};

export default CardCreation;
