import {
  configureStore,
  createSlice,
  combineReducers,
  PayloadAction,
  createAction,
} from "@reduxjs/toolkit";

interface DecksState {
  decks: Deck[];
}

interface DeckState {
  deck: Deck | null;
}

interface MasteryState {
  [deckId: string]: Mastery[];
}

// Define initial state
const initialDecksState: DecksState = {
  decks: [],
};

const initialDeckState: DeckState = {
  deck: null,
};

const initialMasteryState: MasteryState = {};

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

// Export the slice actions and reducers
export const { setDecks } = decksSlice.actions;
export const decksReducer = decksSlice.reducer;

export const { setDeck } = deckSlice.actions;
export const deckReducer = deckSlice.reducer;

// export const { setDeckMastery } = masterySlice.actions;
export const masteryReducer = masterySlice.reducer;

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

export const deleteDeckById =
  (id: string) => (dispatch: any, getState: any) => {
    const { decks } = getState().decks;
    const updatedDecks = decks.filter((d: Deck) => d.id !== id);
    dispatch(setDecks(updatedDecks));
  };
