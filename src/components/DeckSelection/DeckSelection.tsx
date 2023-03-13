import React from "react";
import DeckPreview from "../DeckPreview/DeckPreview";
import styles from "./DeckSelection.module.scss";

const DeckSelection = () => {
  return (
    <div className={styles.deckselection}>
      <DeckPreview />
    </div>
  );
};

export default DeckSelection;
