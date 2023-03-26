import React from "react";
import { useParams } from "react-router-dom";
import { useDeck } from "../utils/hooks";
import styles from "./Study.module.scss";

const Study = () => {
  const { deckId = "" } = useParams<{ deckId: string }>();

  const deck = useDeck(deckId);

  return (
    <div>
      <h1>Study</h1>
      <h2>{deck?.title}</h2>
      <p>{deck?.description}</p>
      {deck?.cards?.map((card, index) => {
        return (
          <div key={index}>
            <h3>{card.front}</h3>
            <p>{card.back}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Study;
