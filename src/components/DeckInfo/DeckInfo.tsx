import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { auth, firestore, increment } from "../utils/firebase";
import { useDecks } from "../utils/hooks";
import { motion } from "framer-motion";
import { ReactComponent as User } from "../../assets/user.svg";
import { ReactComponent as Cards } from "../../assets/cards.svg";
import { ReactComponent as Star } from "../../assets/star.svg";
import { ReactComponent as Lightning } from "../../assets/lightning.svg";
import { ReactComponent as Clock } from "../../assets/clock.svg";
import Button from "../Button/Button";
import CardPreview from "../CardPreview/CardPreview";
import Comment from "../Comment/Comment";
import styles from "./DeckInfo.module.scss";
//TODO: Fetch all cards from specific deck (implement useDeck hook)
//TODO: Show user's SRS card weight beside each card

/* 
authorID: string;
  authorName: string;
  content: string;
  date: Date;
*/

const comments: UserComment[] = [
  {
    authorID: "123",
    authorName: "John Doe",
    content: "This is a comment",
    date: new Date(),
  },
  {
    authorID: "456",
    authorName: "Jane Doe",
    content: "This is also a comment",
    date: new Date(),
  },
  {
    authorID: "123",
    authorName: "John Doe",
    content:
      "This is a really really really really really really really really long comment",
    date: new Date(),
  },
  {
    authorID: "456",
    authorName: "Jane Doe",
    content: "This is also a comment",
    date: new Date(),
  },
];

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

  const handleAdd = () => {
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
  };

  const handleStudy = () => {
    handleAdd();

    navigate(`/study/${deckId}`);
  };
  return (
    <>
      {deck ? (
        <div className={styles.deckinfo}>
          <motion.div
            className={styles.deckinfo__top}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
          >
            <h1 className={styles.deckinfo__title}>{deck.title}</h1>
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
            <div className={styles.deckinfo__created}>
              <Clock
                fill="var(--text-color)"
                className={styles.deckinfo__icon}
              />
              Mar 2023
            </div>
            <div className={styles.deckinfo__numcards}>
              <Cards
                fill="var(--text-color)"
                className={styles.deckinfo__icon}
              />
              {deck.cardCount} Card{deck.cardCount > 1 && "s"}
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
              {userDoc && !userDoc.exists() ? (
                <div className={styles.deckpreview__button}>
                  <Button label="+" onClick={handleAdd} />
                </div>
              ) : (
                <div className={styles.deckpreview__button}>
                  <Button label="✓" disabled={true} />
                </div>
              )}
            </div>
          </motion.div>
          <motion.h2
            className={styles.deckinfo__cards__title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            Cards
          </motion.h2>
          <motion.div
            className={styles.deckinfo__cards}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.075 }}
          >
            {deck.cards?.map((card) => (
              <CardPreview card={card} />
            ))}
          </motion.div>
          {comments && comments.length > 0 && (
            <>
              <motion.h2
                className={styles.deckinfo__cards__title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.125 }}
              >
                Comments
              </motion.h2>
              <motion.div
                className={styles.deckinfo__comments}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.175 }}
              >
                {comments.map((comment) => (
                  <Comment comment={comment} />
                ))}
              </motion.div>
            </>
          )}
        </div>
      ) : (
        <div>Loading deck...</div>
      )}
    </>
  );
};

export default DeckInfo;
