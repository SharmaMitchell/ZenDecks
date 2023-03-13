import React from "react";
import DeckPreview from "../DeckPreview/DeckPreview";
import styles from "./DeckSelection.module.scss";

const exampleDecks = [
  {
    title: "Japanese Software Engineering Vocabulary",
    description:
      "A collection of Japanese words and phrases used in software engineering and computer science. Includes words for programming languages, web development, and more.",
    tags: ["Japanese", "Programming", "Computer Science"],
    author: "Mitchell Sharma",
    rating: 4.5,
    numcards: 85,
    numusers: 100,
  },
];

const DeckSelection = () => {
  return (
    <div className={styles.deckselection}>
      <h2 className={styles.deckselection__title}>Decks</h2>
      <div className={styles.deckselection__decks}>
        {exampleDecks.map((deck) => (
          <DeckPreview {...deck} />
        ))}
      </div>
    </div>
  );
};

export default DeckSelection;
