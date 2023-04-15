import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeck, useDeckMastery } from "../utils/hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./Study.module.scss";
import Flashcard from "../Flashcard/Flashcard";
import Button from "../Button/Button";

/* 
Study mode MVP:
- On start of session, queue all cards in deck (or all cards that have not been studied yet)
- Save study progress in redux store
- On swiper slide change, update redux store with current card index
- On session end, update firebase with new study progress
  - TODO: Implement firestore collection for study progress per user per deck

Study mode v2:
- Implement SRS algorithm
  - Track "lastStudied" date for each card
  - Track "nextReview" date for each card, based on SRS algorithm
  - Queue cards based on "nextReview" date (queue all if "nextReview" is null)
  - Implement "good"/"bad" buttons for card reviews
    - Adjust "nextReview" date based on "good"/"bad" button

Study mode UI improvements:
- Larger cards on desktop (work on scaling size to screen better)
- Fix card scrolling on overflow
- Fix card markdown/latex
- Fix card code blocks
*/

/**
 * Study component (study mode): study all cards in a deck (based on deckId in URL)
 * @todo Use swiper to swipe through cards
 *       (To avoid lag on large decks, only pass 3 cards to swiper at once: current, prev, next)
 */
const Study = () => {
  const { deckId = "" } = useParams<{ deckId: string }>();
  const [currentCard, setCurrentCard] = useState(0);

  const deck = useDeck(deckId);
  //const deckMastery = useDeckMastery(deckId);

  const navigate = useNavigate();

  if (!deck || !deck.cards) return null;

  const totalCards = deck.cards.length;

  const handleBad = () => {
    if (currentCard + 1 === totalCards) {
      return;
    }
    setCurrentCard(currentCard + 1);
  };

  const handleSaveAndExit = () => {
    // save data to firebase
    navigate(`/decks/${deckId}`);
  };

  console.log(currentCard);

  return (
    <div className={styles.study}>
      <h2>{deck.title}</h2>
      <div className={styles.study__cards}>
        <Swiper
          slidesPerView={1}
          spaceBetween={60}
          loop={false}
          modules={[Navigation]}
          navigation={true}
          className={styles.swiper}
          onSwiper={(swiper) => {
            swiper.on("slideChange", () => {
              setCurrentCard(swiper.activeIndex);
            });
          }}
        >
          {deck.cards.map((card, index) => (
            <SwiperSlide key={index} style={{ width: "auto" }}>
              <Flashcard
                front={card.front}
                back={card.back}
                size="large"
                key={index}
                isStudyMode={true}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.study__buttons}>
          <Button label="Needs Practice" onClick={handleBad} againstpage />
          <Button
            label="Save and Exit"
            onClick={handleSaveAndExit}
            againstpage
          />
        </div>
        <div className={styles.study__cardcount}>
          {currentCard + 1} / {totalCards}
        </div>
      </div>
    </div>
  );
};

export default Study;
