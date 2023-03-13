import React from "react";
import styles from "./DeckPreview.module.scss";
import Button from "../Button/Button";
import { ReactComponent as User } from "../../assets/user.svg";
import { ReactComponent as Cards } from "../../assets/cards.svg";
import { ReactComponent as Star } from "../../assets/star.svg";
import { ReactComponent as Lightning } from "../../assets/lightning.svg";

interface DeckPreviewProps {
  title: string;
  description: string;
  tags?: string[];
  author: string;
  rating?: number;
  numcards: number;
  numusers?: number;
  // Card array for preview carousel
}

const DeckPreview = (props: DeckPreviewProps) => {
  const {
    title,
    description,
    tags = [],
    author,
    rating = 0,
    numcards,
    numusers = 0,
  } = props;
  return (
    <div className={styles.deckpreview}>
      <div className={styles.deckpreview__left}>
        <h3 className={styles.deckpreview__title}>{title}</h3>
        <p className={styles.deckpreview__description}>{description}</p>
        <ul className={styles.deckpreview__tags}>
          {tags.map((tag) => (
            <li>{tag}</li>
          ))}
        </ul>

        <div className={styles.deckpreview__author}>
          <User fill="var(--text-color)" className={styles.deckpreview__icon} />
          {author}
        </div>
        <div className={styles.deckpreview__rating}>
          <Star fill="var(--text-color)" className={styles.deckpreview__icon} />
          {rating}
        </div>
        <div className={styles.deckpreview__numcards}>
          <Cards
            fill="var(--text-color)"
            className={styles.deckpreview__icon}
          />
          {numcards} cards
        </div>
        <div className={styles.deckpreview__numusers}>
          <Lightning
            fill="var(--text-color)"
            className={styles.deckpreview__icon}
          />
          {numusers} users
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
