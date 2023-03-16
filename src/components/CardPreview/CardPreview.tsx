import React from "react";
import styles from "./CardPreview.module.scss";

interface CardPreviewProps {
  card: Card;
}

const CardPreview = (props: CardPreviewProps) => {
  const { card } = props;
  return (
    <div>
      <p>{card.front}</p>
      <p>{card.back}</p>
    </div>
  );
};

export default CardPreview;
