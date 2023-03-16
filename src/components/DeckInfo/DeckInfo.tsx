import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { auth, firestore, increment } from "../utils/firebase";
import { useDecks } from "../utils/hooks";
import styles from "./DeckInfo.module.scss";
import { ReactComponent as User } from "../../assets/user.svg";
import { ReactComponent as Cards } from "../../assets/cards.svg";
import { ReactComponent as Star } from "../../assets/star.svg";
import { ReactComponent as Lightning } from "../../assets/lightning.svg";
import Button from "../Button/Button";
import CardPreview from "../CardPreview/CardPreview";

//TODO: Fetch all cards from specific deck (implement useDeck hook)
//TODO: Show user's SRS card weight beside each card

const DeckInfo = () => {
  const { deckId } = useParams<{ deckId: string }>();

  //   const deck = useDeck(deckId);
  const deck = useDecks()[0];
  const navigate = useNavigate();

  // Listen to users document for current user
  const userRef = firestore
    .collection("decks")
    .doc(deckId)
    .collection("users")
    .doc(auth.currentUser?.uid);

  const [userDoc] = useDocument(userRef as any);

  const handleStudy = () => {
    if (userDoc && !userDoc.exists()) {
      try {
        const uid = auth.currentUser?.uid;
        const batch = firestore.batch();
        // TODO: deckref is undefined here, fix it
        // batch.update(deckRef, { userCount: increment(1) });
        batch.set(userRef, { uid /*lastStudied: new Date()*/ });

        batch.commit();
      } catch (err) {
        console.log(err);
      }
    }

    navigate(`/study/${deckId}`);
  };
  return (
    <>
      {deck ? (
        <div className={styles.deckinfo}>
          <div className={styles.deckinfo__top}>
            <h3 className={styles.deckinfo__title}>{deck.title}</h3>
            <p className={styles.deckinfo__description}>{deck.description}</p>
            <ul className={styles.deckinfo__tags}>
              {deck.tags?.map((tag) => (
                <li>{tag}</li>
              ))}
            </ul>

            <div className={styles.deckinfo__author}>
              <User
                fill="var(--text-color)"
                className={styles.deckinfo__icon}
              />
              {deck.authorName}
            </div>
            <div className={styles.deckinfo__rating}>
              <Star
                fill="var(--text-color)"
                className={styles.deckinfo__icon}
              />
              {deck.ratingCount && deck.rating && deck.ratingCount > 0
                ? (deck.rating / deck.ratingCount).toFixed(1)
                : "N/A"}
            </div>
            <div className={styles.deckinfo__numcards}>
              <Cards
                fill="var(--text-color)"
                className={styles.deckinfo__icon}
              />
              {deck.cardCount} Card{deck.cardCount > 1 && "s"}
            </div>
            <div className={styles.deckinfo__numusers}>
              <Lightning
                fill="var(--text-color)"
                className={styles.deckinfo__icon}
              />
              {deck.userCount} User
              {deck.userCount && deck.userCount > 1 && "s"}
            </div>
            <div className={styles.deckinfo__buttons}>
              <div className={styles.deckinfo__button}>
                <Button label="Study Deck" onClick={handleStudy} />
              </div>
            </div>
          </div>
          <div className={styles.deckinfo__cards}>
            {deck.cards?.map((card) => (
              <CardPreview card={card} />
            ))}
          </div>
        </div>
      ) : (
        <div>Loading deck...</div>
      )}
    </>
  );
};

export default DeckInfo;
