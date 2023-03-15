import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import Home from "./pages/Home";
import Demo from "./pages/Demo";
import Login from "./pages/Login";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Navbar from "./components/Navbar/Navbar";
import "./App.scss";
import { UserContext } from "./components/utils/context";
import { useUserData } from "./components/utils/hooks";

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
      <UserContext.Provider value={{ user, username } as any}>
        <Router>
          <ScrollToTop />
          <Navbar switchTheme={switchTheme} theme={theme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Login />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
