import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { analytics, auth, firestore, increment } from "../utils/firebase";
import { useDeck } from "../utils/hooks";
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
import store, { deleteDeckById } from "../../store/store";
import { DropdownMenu, DropdownItem } from "../DropdownMenu/DropdownMenu";
//TODO: Fetch all cards from specific deck (implement useDeck hook)
//TODO: Show user's SRS card weight beside each card

// Plceholder mock data
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

/**
 * DeckInfo component (full info for a deck, incl. metadata, all cards, and comments)
 * @todo Add "progress"/"mastery" section displaying user's progress and stats on the deck
 *       (e.g. how many cards they've studied, how many they've mastered, etc.)
 *       (maybe also add a "study streak" counter - consider other stats to add)
 */
const DeckInfo = () => {
  const { deckId = "" } = useParams<{ deckId: string }>();

  const deck = useDeck(deckId);
  // const deck = useDecks()[0];
  const navigate = useNavigate();

  // Listen to users document for current user
  const userRef = firestore
    .collection("decks")
    .doc(deckId)
    .collection("users")
    .doc(auth.currentUser?.uid);

  const [userDoc] = useDocument(userRef as any);

  /**
   * Add user to deck, when user clicks "Study" or "Add to Library"
   * @todo Fix deckRef
   * @todo Add lastStudied field to user document
   */
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

  /**
   * Navigate to study page for deck, and add user to the deck
   */
  const handleStudy = () => {
    handleAdd();

    analytics.logEvent("study_deck", {
      deckId,
      deckTitle: deck?.title,
    });

    navigate(`/study/${deckId}`);
  };

  /**
   * Delete deck from database
   * @todo add a confirmation modal (without using window.confirm)
   * @todo style the delete button (maybe hide it behind a dropdown menu, with an edit button)
   */
  const handleDeleteDeck = async () => {
    if (!deck || !deckId || deckId === "") return;
    if (!window.confirm("Are you sure you want to delete this deck?")) return;
    if (deck.authorID !== auth.currentUser?.uid) return;
    try {
      const batch = firestore.batch();
      const deckRef = firestore.collection("decks").doc(deckId);
      batch.delete(deckRef);

      // Delete subcollections
      const cardsRef = deckRef.collection("cards");
      const usersRef = deckRef.collection("users");
      const ratingsRef = deckRef.collection("ratings");

      const [cardsSnapshot, usersSnapshot, ratingsSnapshot] = await Promise.all(
        [cardsRef.get(), usersRef.get(), ratingsRef.get()]
      );

      cardsSnapshot.forEach((doc) => batch.delete(doc.ref));
      usersSnapshot.forEach((doc) => batch.delete(doc.ref));
      ratingsSnapshot.forEach((doc) => batch.delete(doc.ref));

      await batch.commit();
      store.dispatch(deleteDeckById(deckId));

      analytics.logEvent("deck_deleted", {
        deckId,
        deckTitle: deck.title,
      });

      navigate("/decks");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditDeck = () => {
    navigate(`/edit/${deckId}`);
  };

  return (
    <>
      {deck ? (
        <div className={styles.deckinfo}>
          <motion.div
            className={styles.deckinfo__top}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: 0.1 }}
          >
            <h1 className={styles.deckinfo__title}>{deck.title}</h1>
            <p className={styles.deckinfo__description}>{deck.description}</p>
            <ul className={styles.deckinfo__tags}>
              {deck.tags?.map((tag, index) => (
                <li key={index}>{tag}</li>
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
              {new Date(deck.created).toLocaleDateString("en-us", {
                month: "short",
                year: "numeric",
              })}
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
                <Button label="Study Deck" onClick={handleStudy} againstcard />
              </div>
              {userDoc ? (
                !userDoc.exists() ? (
                  <div className={styles.deckinfo__button}>
                    <Button label="+" onClick={handleAdd} againstcard />
                  </div>
                ) : (
                  <div className={styles.deckinfo__button}>
                    <Button label="✓" disabled={true} />
                  </div>
                )
              ) : null}
              {deck.authorID === auth.currentUser?.uid && (
                <div className={styles.deckinfo__button}>
                  <DropdownMenu
                    toggleButton={<Button label="Settings" againstcard />}
                  >
                    <DropdownItem>
                      <Button
                        label="Edit Deck"
                        onClick={handleEditDeck}
                        againstcard
                      />
                    </DropdownItem>
                    <DropdownItem>
                      <Button
                        label="Delete Deck"
                        onClick={handleDeleteDeck}
                        againstcard
                      />
                    </DropdownItem>
                  </DropdownMenu>
                </div>
              )}
            </div>
          </motion.div>
          <motion.h2
            className={styles.deckinfo__cards__title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            Cards
          </motion.h2>
          <motion.div
            className={styles.deckinfo__cards}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.175 }}
          >
            {deck.cards &&
              [...deck.cards]
                .sort((a, b) =>
                  a.created && b.created ? a.created - b.created : 0
                )
                .map((card, index) => <CardPreview card={card} key={index} />)}
          </motion.div>
          {comments && comments.length > 0 && (
            <>
              <motion.h2
                className={styles.deckinfo__cards__title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.225 }}
              >
                Comments
              </motion.h2>
              <motion.div
                className={styles.deckinfo__comments}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.275 }}
              >
                {comments.map((comment, index) => (
                  <Comment comment={comment} key={index} />
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
