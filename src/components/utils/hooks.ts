import { auth, firestore } from "./firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import store, { setDecks, RootState } from "../../store/store";

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

  // Get the first 5 cards for each deck using a collectionGroup query
  const [cardsValue, cardsLoading, cardsError, cardsSnapshot] =
    useCollectionDataOnce(
      decks.length === 0 // check if data is already in store
        ? (firestore.collectionGroup("cards").limit(5) as any)
        : null
    );

  useEffect(() => {
    if (cardsSnapshot && snapshot) {
      const docs = snapshot.docs.map((doc) => {
        console.log("cards: ", cardsSnapshot.docs[0].data());
        console.log("parent: ", cardsSnapshot.docs[0].ref.parent?.parent?.id);
        console.log("doc: ", doc.id);
        const deckCards = cardsSnapshot.docs
          .filter((cardDoc) => cardDoc.ref.parent?.parent?.id === doc.id)
          .map((cardDoc) => cardDoc.data());
        console.log("deckCards: ", deckCards);
        return {
          id: doc.id,
          ref: doc.ref,
          cards: deckCards,
          ...doc.data(),
        };
      });

      store.dispatch(setDecks(docs));
      console.log("useDecks: ", docs);
    }
  }, [cardsSnapshot, snapshot]);

  return decks;
}
