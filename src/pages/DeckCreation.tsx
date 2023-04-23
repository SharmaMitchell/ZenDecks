import React, { useEffect } from "react";
import DeckCreation from "../components/DeckCreation/DeckCreation";
const DeckCreationPage = () => {
  useEffect(() => {
    document.title = "Create Deck | ZenDecks: Next-gen Flashcards";
  }, []);
  return (
    <div>
      <DeckCreation />
    </div>
  );
};

export default DeckCreationPage;
