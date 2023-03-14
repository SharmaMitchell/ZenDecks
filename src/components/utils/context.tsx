import { createContext } from "react";

// create user context with user as type object and username as type string, with default values of null
export const UserContext = createContext({ user: null, username: null } as {
  user: object | null;
  username: string | null;
});
