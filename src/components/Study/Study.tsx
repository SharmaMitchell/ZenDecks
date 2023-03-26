import React from "react";
import { useParams } from "react-router-dom";
import { useDeck } from "../utils/hooks";
import styles from "./Study.module.scss";
import Flashcard from "../Flashcard/Flashcard";

const Study = () => {
  const { deckId = "" } = useParams<{ deckId: string }>();

  const deck = useDeck(deckId);

  return (
    <div className={styles.study}>
      <h2>{deck?.title}</h2>
      {deck?.cards?.map((card, index) => {
        return <Flashcard key={index} front={card.front} back={card.back} />;
      })}
    </div>
  );
};

export default Study;
