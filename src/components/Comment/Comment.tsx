import React from "react";
import { ReactComponent as User } from "../../assets/user.svg";
import { ReactComponent as Heart } from "../../assets/heart.svg";
import styles from "./Comment.module.scss";

interface CommentProps {
  comment: UserComment;
}

/**
 * Comment component (used in DeckInfo component)
 * @param props - The props object for the Comment component
 * @param props.comment - The comment to render
 */
const Comment = (props: CommentProps) => {
  const { comment } = props;

  return (
    <div>
      <div className={styles.comment}>
        <div className={styles.comment__top}>
          <div className={styles.comment__author}>
            <User fill="var(--text-color)" className={styles.comment__icon} />
            {comment.authorName}
          </div>
          <div className={styles.comment__date}>
            {comment.date.toLocaleDateString()}
          </div>
        </div>
        <div className={styles.comment__content}>{comment.content}</div>
        <div className={styles.comment__bottom}>
          <div className={styles.comment__likes}>
            <Heart
              fill="var(--text-color)"
              className={styles.comment__icon__heart__outlined}
            />
            22
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
