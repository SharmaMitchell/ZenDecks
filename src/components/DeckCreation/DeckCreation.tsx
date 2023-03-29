import React from "react";
import styles from "./DeckCreation.module.scss";
import { motion } from "framer-motion";

const DeckCreation = () => {
  return (
    <div className={styles.deckcreation}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
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
          />
          <label
            className={styles.deckcreation__input__label}
            htmlFor="decktags"
          >
            Tags
          </label>
          <input
            type="text"
            name="decktags"
            id="decktags"
            placeholder="Comma separated tags: New, Deck, Wow"
            className={styles.deckcreation__input}
          />
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
      <div className={styles.deckcreation__cards}></div>
    </div>
  );
};

export default DeckCreation;
