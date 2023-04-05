import {
  configureStore,
  createSlice,
  combineReducers,
  createAction,
} from "@reduxjs/toolkit";

/* All decks info/data, incl. deck metadata, cards content, etc. */
interface DecksState {
  decks: Deck[];
}

// Define initial state
const initialDecksState: DecksState = {
  decks: [],
};

// Define a slice for ALL decks
const decksSlice = createSlice({
  name: "decks",
  initialState: initialDecksState,
  reducers: {
    setDecks(state, action) {
      state.decks = action.payload;
    },
  },
});

export const { setDecks } = decksSlice.actions;
export const decksReducer = decksSlice.reducer;

/* Single deck */
interface DeckState {
  deck: Deck | null;
}

const initialDeckState: DeckState = {
  deck: null,
};

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

// Export deck setter, reducer
export const { setDeck } = deckSlice.actions;
export const deckReducer = deckSlice.reducer;

// Define a new action to set a single deck
export const setDeckById =
  (id: string, deck: Deck) => (dispatch: any, getState: any) => {
    const { decks } = getState().decks;

    // If the deck already exists, update it, otherwise add it to the list
    const deckIndex = decks.findIndex((d: Deck) => d.id === id);
    const updatedDecks =
      deckIndex !== -1
        ? decks.map((d: Deck) => (d.id === id ? { ...d, ...deck } : d))
        : [...decks, { ...deck }];
    dispatch(setDecks(updatedDecks));
    dispatch(setDeck(deck));
  };

// Delete a single deck by ID
export const deleteDeckById =
  (id: string) => (dispatch: any, getState: any) => {
    const { decks } = getState().decks;
    const updatedDecks = decks.filter((d: Deck) => d.id !== id);
    dispatch(setDecks(updatedDecks));
  };

/* Master state for all decks */
interface MasteryState {
  [deckId: string]: Mastery[];
}

const initialMasteryState: MasteryState = {};

// Set mastery for a single deck
interface SetDeckMasteryPayload {
  deckId: string;
  deckMastery: Mastery[];
}

export const setDeckMastery = createAction(
  "mastery/setDeckMastery",
  (deckId: string, masteryLevels: Mastery[]) => ({
    payload: {
      deckId,
      deckMastery: masteryLevels,
    },
  })
);

const masterySlice = createSlice({
  name: "mastery",
  initialState: initialMasteryState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setDeckMastery, (state, action) => {
      const { deckId, deckMastery } = action.payload;
      state[deckId] = deckMastery;
    });
  },
});

// Export mastery reducer
export const masteryReducer = masterySlice.reducer;

// Combine all reducers
export const rootReducer = combineReducers({
  decks: decksReducer,
  deck: deckReducer,
  mastery: masteryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// Create the Redux store
const store = configureStore({
  reducer: {
    decks: decksReducer,
    deck: deckReducer,
    mastery: masteryReducer,
  },
});

export default store;
