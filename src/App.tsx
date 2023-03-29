import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import Home from "./pages/Home";
import Decks from "./pages/Decks";
import DeckInfoPage from "./pages/DeckInfo";
import DeckCreation from "./pages/DeckCreation";
import StudyPage from "./pages/Study";
import Login from "./pages/Login";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Navbar from "./components/Navbar/Navbar";
import "./App.scss";
import { UserContext } from "./components/utils/context";
import { useUserData } from "./components/utils/hooks";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const { user, username } = useUserData();
  /* TODO: Bug - username missing on refresh, causing issues. Cache? Cookie? */
  // if (user && !username) {
  //   return (
  //     <div className="App" data-theme={theme}>
  //       <UserContext.Provider value={{ user, username } as any}>
  //         <Router>
  //           <ScrollToTop />
  //           <Navbar switchTheme={switchTheme} theme={theme} />
  //           <Routes>
  //             <Route path="*" element={<Login />} />
  //           </Routes>
  //         </Router>
  //       </UserContext.Provider>
  //     </div>
  //   );
  // }
  return (
    <div className="App" data-theme={theme}>
      <Provider store={store}>
        <UserContext.Provider value={{ user, username } as any}>
          <Router>
            <ScrollToTop />
            <Navbar switchTheme={switchTheme} theme={theme} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<h1>About</h1>} />
              <Route path="/decks" element={<Decks />} />
              <Route path="/decks/:deckId" element={<DeckInfoPage />} />
              <Route path="/create" element={<DeckCreation />} />
              <Route path="/study" element={<Decks />} />
              <Route path="/study/:deckId" element={<StudyPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/account" element={<Login />} />
              <Route path="*" element={<h1>404</h1>} />
            </Routes>
          </Router>
        </UserContext.Provider>
      </Provider>
    </div>
  );
}

export default App;
