import React, { useState, useContext } from "react";
import styles from "./DeckCreation.module.scss";
import { motion } from "framer-motion";
import Button from "../Button/Button";
import CardCreation from "../CardCreation/CardCreation";
import { firestore, auth } from "../utils/firebase";
import firebase from "../utils/firebase";
import { UserContext } from "../utils/context";
import store, { setDeckById } from "../../store/store";
import { useNavigate } from "react-router-dom";

/**
 * Displays a form for creating a new deck
 * @returns The DeckCreation component
 * @todo Add "edit deck" functionality
 *  - Take in "create" or "edit" prop
 *  - If "edit", fetch deck info from Firebase, update deck info on submit
 *  - If "create", create new deck in Firebase
 * @todo Add save button to the bottom, near "add card" button
 * @todo Change focus to next card when "add card" button is clicked
 * @todo Add card when "enter" or "tab" are pressed in the back of the last card
 * @todo Move to next text field when "enter" is pressed
 * @todo Hide card preview by default on mobile, add expand button
 */
const DeckCreation = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [cards, setCards] = useState<Card[]>([{ front: "", back: "" }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, username } = useContext(UserContext);
  const navigate = useNavigate();

  /**
   * Updates the cards array with the new card info
   * @param index - The index of the card in the array of cards
   * @param field - The field to update (front or back)
   * @param value - The new value for the field
   */
  const handleCardChange = (
    index: number,
    field: "front" | "back",
    value: string
  ) => {
    const newCards = [...cards];
    newCards[index][field] = value;
    setCards(newCards);
  };

  /**
   * Adds a new card to the cards array
   */
  const addCard = () => {
    setCards([...cards, { front: "", back: "" }]);
  };

  /**
   * Submits the deck info and cards to Firebase
   * @param e - The form submit event
   * @todo Add UI for errors
   * @todo Add UI for loading
   * @todo Add UI for success
   * @todo Set AllDecksLoaded to false in the Decks store, when a new deck is created
   *   (Alternatively, manually add the new deck to the Decks store when it's created)
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || title.trim() == "") {
      setError("Please provide a title for your deck");
      return;
    }

    if (!user || !username) {
      setError("Please log in to create a deck");
      return;
    }

    setLoading(true);

    try {
      const deckRef = firestore.collection("decks").doc();
      const cardsRef = deckRef.collection("cards");

      const newDeck = {
        authorID: auth.currentUser?.uid,
        authorName: username,
        cardCount: cards.length,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        description,
        public: true,
        rating: 0,
        ratingCount: 0,
        tags: tags.trim() != "" ? tags.split(",").map((tag) => tag.trim()) : [],
        title,
        userCount: 1,
      };

      // Add the current user to the "Users" subcollection of the new deck document
      const userRef = firestore
        .collection("decks")
        .doc(deckRef.id)
        .collection("users")
        .doc(auth.currentUser?.uid);
      await userRef.set({});

      // Add the new deck to the "Decks" store
      await deckRef.set(newDeck);

      // Add cards to the "Cards" subcollection of the new deck document
      const batch = firestore.batch();

      cards.forEach((card) => {
        if (card.front != "" || card.back != "") {
          console.log(card.back, card.front);
          const newCardRef = cardsRef.doc();
          batch.set(newCardRef, card);
        }
      });

      await batch.commit();

      // Add the new deck to the "Decks" store
      store.dispatch(
        setDeckById(
          deckRef.id,
          // convert the Firestore Timestamp to a number (milliseconds since epoch)
          {
            ...newDeck,
            created: Date.now(),
            id: deckRef.id,
            path: deckRef.path,
            cards: cards.filter((card) => card.front != "" || card.back != ""),
            allCardsLoaded: true,
          } as Deck
        )
      );

      setLoading(false);
      navigate(`/decks/${deckRef.id}`);

      // success notification
    } catch (error) {
      setLoading(false);
      setError(
        "There was an error creating your deck. Please try again later."
      );
      console.error(error);
    }
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
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className={styles.deckcreation__top}
        >
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
              <Button label="Save" onClick={handleSubmit as any} />
            </div>
          </div>
        </motion.div>
      </form>
      <motion.h2
        className={styles.deckcreation__cards__title}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.1625 }}
        className={styles.deckcreation__addcard}
      >
        <Button label="Add Card" onClick={addCard} />
      </motion.div>
    </div>
  );
};

export default DeckCreation;
