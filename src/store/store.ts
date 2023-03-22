import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";

interface DecksState {
  decks: Deck[];
}

interface DeckState {
  deck: Deck | null;
}

// Define initial state
const initialDecksState: DecksState = {
  decks: [],
};

const initialDeckState: DeckState = {
  deck: null,
};

// Define a slice for the decks
const decksSlice = createSlice({
  name: "decks",
  initialState: initialDecksState,
  reducers: {
    setDecks(state, action) {
      state.decks = action.payload;
    },
  },
});

// Define a slice for a single deck
const deckSlice = createSlice({
  name: "deck",
  initialState: initialDeckState,
  reducers: {
    setDeck(state, action) {
      state.deck = action.payload;
    },
  },
});

// Export the slice actions and reducers
export const { setDecks } = decksSlice.actions;
export const decksReducer = decksSlice.reducer;

export const { setDeck } = deckSlice.actions;
export const deckReducer = deckSlice.reducer;

export const rootReducer = combineReducers({
  decks: decksReducer,
  deck: deckReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// Create the Redux store
const store = configureStore({
  reducer: {
    decks: decksReducer,
    deck: deckReducer,
  },
});

export default store;

// Define a new action to set a single deck
export const setDeckById =
  (id: string, deck: Deck) => (dispatch: any, getState: any) => {
    const { decks } = getState().decks;
    const updatedDecks = decks.map((d: Deck) =>
      d.id === id ? { ...d, ...deck } : d
    );
    dispatch(setDecks(updatedDecks));
    dispatch(setDeck(deck));
  };
