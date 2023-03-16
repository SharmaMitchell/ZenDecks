import { createContext } from "react";

interface UserContext {
  user: {
    uid: string;
    photoURL: string;
  } | null;
  username: string | null;
}

export const UserContext = createContext<UserContext>({
  user: null,
  username: null,
});
