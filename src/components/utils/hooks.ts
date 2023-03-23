import { auth, firestore } from "./firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import {
  useCollectionData,
  useCollectionDataOnce,
  useDocumentData,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import store, { setDecks, RootState, setDeckById } from "../../store/store";

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user] = useAuthState(auth as any);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = firestore.collection("users").doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
}

// Custom hook to get deck data from firestore, and store it in the redux store
// Data will only be fetched if the decks array in the store is empty
export function useDecks(): Deck[] {
  const decks = useSelector((state: RootState) => state.decks.decks);

  const [value, loading, error, snapshot] = useCollectionDataOnce(
    decks.length === 0 // check if data is already in store
      ? (firestore
          .collection("decks")
          .where("public", "==", true)
          .limit(10) as any)
      : null
  );

  // Get the first 5 cards PER DECK using a collectionGroup query
  const [cardsValue, cardsLoading, cardsError, cardsSnapshot] =
    useCollectionDataOnce(
      decks.length === 0 // check if data is already in store
        ? (firestore.collectionGroup("cards") as any)
        : null
    );

  useEffect(() => {
    if (cardsSnapshot && snapshot) {
      const docs = snapshot.docs.map((doc) => {
        const deckCards = cardsSnapshot.docs
          .filter((cardDoc) => cardDoc.ref.parent?.parent?.id === doc.id)
          .map((cardDoc) => cardDoc.data());
        console.log(doc.data()?.created);
        console.log(doc.data()?.created.toMillis());
        console.log(doc.data()?.created.toDate());
        console.log(doc.data()?.created.toDate().getTime());
        return {
          ...doc.data(),
          id: doc.id,
          path: doc.ref.path,
          cards: deckCards,
          allCardsLoaded: false,
          created: doc.data()?.created.toMillis(), // Convert firebase timestamp to milliseconds
        } as Deck;
      });
      console.log(docs); // created: nt {seconds: 1678726800, nanoseconds: 346000000}
      store.dispatch(setDecks(docs));
    }
  }, [cardsSnapshot, snapshot]);

  return decks;
}

// Custom hook to get deck data and all cards from firestore, and store it in the redux store
// Data will only be fetched once per session for each deck (tracked by deck.allCardsLoaded)
export function useDeck(deckId: string): Deck | undefined {
  const decks = useSelector((state: RootState) => state.decks.decks);

  const [value, loading, error, snapshot] = useDocumentData(
    decks.find((deck) => deck.id === deckId)?.allCardsLoaded // check if all cards have been loaded for this deck
      ? null
      : (firestore.collection("decks").doc(deckId) as any)
  );

  // Get up to 100 cards for the deck (session study limit = 100)
  const [cardsValue, cardsLoading] = useCollectionData(
    decks.find((deck) => deck.id === deckId)?.allCardsLoaded // check if all cards have been loaded for this deck
      ? null
      : (firestore
          .collection("decks")
          .doc(deckId)
          .collection("cards")
          .limit(100) as any)
  );

  // Set card data for the deck in the redux store
  useEffect(() => {
    if (cardsValue && value && snapshot) {
      store.dispatch(
        setDeckById(deckId, {
          ...value,
          id: snapshot.id,
          path: snapshot.ref.path,
          created: value.created.toMillis(),
          allCardsLoaded: true,
          cards: cardsValue,
        } as Deck)
      );
    }
  }, [cardsValue, value]);

  // Return the corresponding deck, or undefined if not found
  return decks.find((deck) => deck.id === deckId);
}
