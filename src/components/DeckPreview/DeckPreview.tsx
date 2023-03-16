import React from "react";
import styles from "./DeckPreview.module.scss";
import Button from "../Button/Button";
import Flashcard from "../Flashcard/Flashcard";
import { ReactComponent as User } from "../../assets/user.svg";
import { ReactComponent as Cards } from "../../assets/cards.svg";
import { ReactComponent as Star } from "../../assets/star.svg";
import { ReactComponent as Lightning } from "../../assets/lightning.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { firestore, auth, increment } from "../../components/utils/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { DocumentReference } from "firebase/firestore";

interface DeckPreviewProps {
  title: string;
  description: string;
  tags?: string[];
  author: string;
  rating?: number;
  numRatings?: number;
  numcards: number;
  numusers?: number;
  cards?: Card[];
  preview?: boolean;
  deckRef: any;
}

const DeckPreview = (props: DeckPreviewProps) => {
  const {
    title,
    description,
    tags = [],
    author,
    rating = 0,
    numRatings = 1,
    numcards,
    numusers = 0,
    cards = [],
    preview = true,
    deckRef,
  } = props;

  const navigate = useNavigate();

  // Listen to users document for current user
  const userRef = firestore
    .collection("decks")
    .doc(deckRef.id)
    .collection("users")
    .doc(auth.currentUser?.uid);

  const [userDoc] = useDocument(userRef as any);

  const handleAdd = () => {
    if (userDoc && !userDoc.exists()) {
      try {
        const uid = auth.currentUser?.uid;
        const batch = firestore.batch();

        batch.update(deckRef, { userCount: increment(1) });
        batch.set(userRef, { uid /*lastStudied: new Date()*/ });

        batch.commit();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleStudy = () => {
    handleAdd();
    navigate(`/study/${deckRef.id}`);
  };

  return (
    <div className={`${styles.deckpreview} ${!preview && styles.nopreview}`}>
      <div className={styles.deckpreview__left}>
        <h3 className={styles.deckpreview__title}>{title}</h3>
        <p className={styles.deckpreview__description}>{description}</p>
        <ul className={styles.deckpreview__tags}>
          {tags.map((tag) => (
            <li>{tag}</li>
          ))}
        </ul>

        <div className={styles.deckpreview__author}>
          <User fill="var(--text-color)" className={styles.deckpreview__icon} />
          {author}
        </div>
        <div className={styles.deckpreview__rating}>
          <Star fill="var(--text-color)" className={styles.deckpreview__icon} />
          {numRatings > 0 ? (rating / numRatings).toFixed(1) : "N/A"}
        </div>
        <div className={styles.deckpreview__numcards}>
          <Cards
            fill="var(--text-color)"
            className={styles.deckpreview__icon}
          />
          {numcards} Card{numcards > 1 && "s"}
        </div>
        <div className={styles.deckpreview__numusers}>
          <Lightning
            fill="var(--text-color)"
            className={styles.deckpreview__icon}
          />
          {numusers} User{numusers > 1 && "s"}
        </div>
        <div className={styles.deckpreview__buttons}>
          <div className={styles.deckpreview__button}>
            <Button label="Study Deck" onClick={handleStudy} />
          </div>
          <div className={styles.deckpreview__button}>
            <Button label="Deck Details" link={`/decks/${deckRef.id}`} />
          </div>
          {userDoc && !userDoc.exists() ? (
            <div className={styles.deckpreview__button}>
              <Button label="+" onClick={handleAdd} />
            </div>
          ) : (
            <div className={styles.deckpreview__button}>
              <Button label="✓" disabled={true} />
            </div>
          )}
        </div>
      </div>
      {preview && (
        <div className={styles.deckpreview__right}>
          <div className={styles.deckpreview__carousel}>
            <Swiper
              slidesPerView={1}
              spaceBetween={60}
              loop={false}
              modules={[Navigation, Pagination]}
              navigation={true}
              pagination={true}
              className={styles.swiper}
            >
              {cards?.map((card, index) => (
                <SwiperSlide key={index} style={{ width: "auto" }}>
                  <Flashcard
                    front={card.front}
                    back={card.back}
                    hint={true}
                    size="small"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeckPreview;
