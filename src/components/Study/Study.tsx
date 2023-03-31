import React from "react";
import { useParams } from "react-router-dom";
import { useDeck } from "../utils/hooks";
import styles from "./Study.module.scss";
import Flashcard from "../Flashcard/Flashcard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
 */
const Study = () => {
  const { deckId = "" } = useParams<{ deckId: string }>();

  const deck = useDeck(deckId);

  if (!deck || !deck.cards) return null;

  return (
    <div className={styles.study}>
      <h2>{deck.title}</h2>
      <div className={styles.study__cards}>
        <Swiper
          slidesPerView={1}
          spaceBetween={60}
          loop={false}
          modules={[Navigation, Pagination]}
          navigation={true}
          pagination={true}
          className={styles.swiper}
        >
          {deck.cards.map((card, index) => (
            <SwiperSlide key={index} style={{ width: "auto" }}>
              <Flashcard front={card.front} back={card.back} size="large" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Study;
