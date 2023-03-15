import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";

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
  cardCount: number;
  userCount?: number;
}

interface DecksState {
  decks: Deck[];
}

// Define initial state
const initialState = {
  decks: [],
};

// Define a slice for the decks
const decksSlice = createSlice({
  name: "decks",
  initialState,
  reducers: {
    setDecks(state, action) {
      state.decks = action.payload;
    },
  },
});

// Export the slice actions and reducer
export const { setDecks } = decksSlice.actions;
export const decksReducer = decksSlice.reducer;

export const rootReducer = combineReducers({
  decks: decksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// Create the Redux store
const store = configureStore({
  reducer: {
    decks: decksReducer,
  },
});

export default store;
