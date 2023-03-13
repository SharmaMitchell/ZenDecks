import React from "react";
import styles from "./DeckPreview.module.scss";
import Button from "../Button/Button";
import { ReactComponent as User } from "../../assets/user.svg";
import { ReactComponent as Cards } from "../../assets/cards.svg";
import { ReactComponent as Lightning } from "../../assets/lightning.svg";

/* 

Left side:
    Deck title
    Deck description
    Deck tags
    Deck author
    Deck rating
    Deck number of cards
    Deck number of users
    "Study deck" button

Right side:
    Deck preview carousel (via swiper)
        First 5 cards
*/

const DeckPreview = () => {
  return (
    <div className={styles.deckpreview}>
      <div className={styles.deckpreview__left}>
        <h3 className={styles.deckpreview__title}>
          Japanese Software Engineering Vocabulary
        </h3>
        <p className={styles.deckpreview__description}>
          A collection of Japanese words and phrases used in software
          engineering and computer science. Includes words for programming
          languages, web development, and more.
        </p>
        <ul className={styles.deckpreview__tags}>
          <li>Japanese</li>
          <li>Programming</li>
          <li>Computer Science</li>
        </ul>

        <div className={styles.deckpreview__author}>
          <User fill="var(--text-color)" className={styles.deckpreview__icon} />
          Mitchell Sharma
        </div>
        <div className={styles.deckpreview__rating}>Deck rating</div>
        <div className={styles.deckpreview__numcards}>
          <Cards
            fill="var(--text-color)"
            className={styles.deckpreview__icon}
          />
          85 cards
        </div>
        <div className={styles.deckpreview__numusers}>
          <Lightning
            fill="var(--text-color)"
            className={styles.deckpreview__icon}
          />
          14 users
        </div>
        <Button label="Study deck" />
      </div>
      <div className={styles.deckpreview__right}>
        <div className={styles.deckpreview__carousel}>
          Deck preview carousel (via swiper)
        </div>
      </div>
    </div>
  );
};

export default DeckPreview;
