import React, { useEffect } from "react";
import UserAuth from "../components/UserAuth/UserAuth";

const Login = () => {
  const route = window.location.pathname.split("/")[1];

  const pageTitle =
    route === "login" ? "Login" : route === "signup" ? "Sign Up" : "Account";

  useEffect(() => {
    document.title = `${pageTitle} | ZenDecks: Next-gen Flashcards`;
  }, []);
  return (
    <div>
      <UserAuth />
    </div>
  );
};

export default Login;
