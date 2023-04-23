import React, { useEffect } from "react";
import About from "../components/About/About";

const AboutPage = () => {
  useEffect(() => {
    document.title = "About | ZenDecks: Next-gen Flashcards";
  }, []);
  return (
    <div>
      <About extended={true} />
    </div>
  );
};

export default AboutPage;
