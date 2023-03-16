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

interface Deck {
  id: string;
  ref: any;
  title: string;
  description: string;
  tags?: string[];
  public: boolean;
  authorName: string;
  authorID: string;
  cards?: any[];
  rating?: number;
  ratingCount?: number;
  cardCount: number;
  userCount?: number;
}

/* TODO: Only fetch data once per session, then store in redux store? */
/* This didn't work before because you can't call a hook (useCollection) within a conditional or callback */
// const FetchDecks = async () => {
//   const [value, loading, error, snapshot] = useCollectionDataOnce(
//     firestore.collection("decks").where("public", "==", true).limit(10) as any
//   );

//   if (snapshot) {
//     const docs = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ref: doc.ref,
//       ...doc.data(),
//     }));
//     store.dispatch(setDecks(docs));
//   }
// };

// // Custom hook to get deck data from firestore
// export function useDecks(): Deck[] {
//   const decks = useSelector((state: RootState) => state.decks.decks);
//   useEffect(() => {
//     if (decks.length === 0) {
//       FetchDecks();
//     }
//   }, [decks]);

//   return decks;
// }

// Custom hook to get deck data from firestore
export function useDecks(): Deck[] {
  const decks = useSelector((state: RootState) => state.decks.decks);
  const [value, loading, error, snapshot] = useCollectionDataOnce(
    firestore.collection("decks").where("public", "==", true).limit(10) as any
  );
  useEffect(() => {
    if (snapshot) {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ref: doc.ref,
        ...doc.data(),
      }));
      store.dispatch(setDecks(docs));
      console.log("useDecks: ", docs);
    }
  }, [snapshot]);

  return decks;
}
