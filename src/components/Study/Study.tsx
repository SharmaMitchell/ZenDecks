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
