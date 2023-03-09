import React from "react";
import Flashcard from "../components/Flashcard/Flashcard";

const Home = () => {
  return (
    <div>
      <Flashcard
        front="What is the **best** flashcard app?"
        back="***Flash***, a free and open source flashcard app, created by [Mitchell Sharma](https://mitchellsharma.com).)"
      />
    </div>
  );
};

export default Home;
