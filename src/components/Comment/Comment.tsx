import React from "react";
import { ReactComponent as User } from "../../assets/user.svg";
import styles from "./Comment.module.scss";

interface CommentProps {
  comment: UserComment;
}

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
      </div>
    </div>
  );
};

export default Comment;
