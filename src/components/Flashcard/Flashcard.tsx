import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import styles from "./Flashcard.module.scss";

interface CardProps {
  front?: string;
  back?: string;
  swiping?: boolean;
}

const Flashcard = (props: CardProps) => {
  const { front = "", back = "", swiping = false } = props;

  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={styles.flashcard + " " + (isFlipped ? styles.flipped : "")}
      onClick={!swiping ? flipCard : undefined}
      // onDragStart={(e) => e.preventDefault()}
      // onTouchMove={(e) => e.preventDefault()}
    >
      <div className={styles.flashcard__front}>
        <ReactMarkdown
          className={styles.flashcard__markdown}
          linkTarget="_blank"
          skipHtml={false}
          remarkPlugins={[remarkMath, remarkGfm, remarkBreaks]}
          rehypePlugins={[rehypeKatex]}
        >
          {front}
        </ReactMarkdown>
      </div>
      <div className={styles.flashcard__back}>
        <ReactMarkdown
          className={styles.flashcard__markdown}
          linkTarget="_blank"
          skipHtml={false}
          remarkPlugins={[remarkMath, remarkGfm, remarkBreaks]}
          rehypePlugins={[rehypeKatex]}
          components={{
            code: ({ node, inline, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={tomorrow as any}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children)}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {back}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Flashcard;
