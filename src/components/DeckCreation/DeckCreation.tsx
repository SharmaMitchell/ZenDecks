import React, { useState } from "react";
import styles from "./DeckCreation.module.scss";
import { motion } from "framer-motion";
import Button from "../Button/Button";
import CardCreation from "../CardCreation/CardCreation";

/*
TODO: Add "edit deck" functionality
  - Take in "create" or "edit" prop
  - If "edit", fetch deck info from Firebase
    - On submit, update deck info in Firebase
  - If "create", create new deck in Firebase

TODO: Add save button to the bottom, near "add card" button

*/
const DeckCreation = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [cards, setCards] = useState<Card[]>([{ front: "", back: "" }]);

  const handleCardChange = (
    index: number,
    field: "front" | "back",
    value: string
  ) => {
    const newCards = [...cards];
    newCards[index][field] = value;
    setCards(newCards);
  };

  const addCard = () => {
    setCards([...cards, { front: "", back: "" }]);
  };

  // TODO: Implement submission to Firebase
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // submit deck info and cards to Firebase
  };

  return (
    <div className={styles.deckcreation}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={styles.deckcreation__title}
      >
        Create Deck
      </motion.h2>
      <form className={styles.deckcreation__form}>
        <div className={styles.deckcreation__top}>
          <label
            className={styles.deckcreation__input__label}
            htmlFor="decktitle"
          >
            Title
          </label>
          <input
            type="text"
            name="decktitle"
            id="decktitle"
            placeholder="My New Deck"
            className={styles.deckcreation__input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label
            className={styles.deckcreation__input__label}
            htmlFor="deckdescription"
          >
            Description
          </label>
          <textarea
            rows={4}
            name="deckdescription"
            id="deckdescription"
            placeholder="This is my new deck and it is awesome"
            className={styles.deckcreation__input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label
            className={styles.deckcreation__input__label}
            htmlFor="decktags"
          >
            Tags
          </label>
          <div className={styles.deckcreation__save}>
            <input
              type="text"
              name="decktags"
              id="decktags"
              placeholder="Comma separated tags: New, Deck, Wow"
              className={styles.deckcreation__input}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <div className={styles.deckcreation__save__button}>
              <Button label="Save" />
            </div>
          </div>
        </div>
      </form>
      <motion.h2
        className={styles.deckcreation__cards__title}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        Cards
      </motion.h2>
      <div className={styles.deckcreation__cards}>
        {cards.map((card, index) => (
          <CardCreation
            key={index}
            index={index}
            front={card.front}
            back={card.back}
            handleCardChange={handleCardChange}
          />
        ))}
      </div>
      <div className={styles.deckcreation__addcard}>
        <Button label="Add Card" onClick={addCard} />
      </div>
    </div>
  );
};

export default DeckCreation;
