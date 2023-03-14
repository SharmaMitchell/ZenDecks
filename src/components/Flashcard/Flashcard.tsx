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
  hint?: boolean; // "Tap to flip" hint
  autoflip?: number | false; // Auto-flip interval in ms, false to disable
  swiperUsed?: boolean;
  setSwiperUsed?: React.Dispatch<React.SetStateAction<boolean>>;
  size?: "small" | "large" | undefined;
}

type CodeProps = {
  node?: any;
  inline?: any;
  className?: any;
  children?: any;
};

const CodeComponent: React.FunctionComponent<CodeProps> = ({
  node,
  inline,
  className,
  children,
  ...props
}) => {
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
};

const Flashcard = (props: CardProps) => {
  const {
    front = "",
    back = "",
    hint = false,
    autoflip = false,
    swiperUsed,
    setSwiperUsed,
    size = "large",
  } = props;

  // flip state for card sides
  const [isFlipped, setIsFlipped] = useState(false);

  // auto-flip timer
  const [autoFlipTimeoutId, setAutoFlipTimeoutId] = useState<number | null>(
    null
  );

  // track if card was flipped by timer, to ensure it only ever flips once
  const [isFlippedByTimer, setIsFlippedByTimer] = useState(false);

  // flip card on click
  const flipCard = () => {
    setIsFlipped(!isFlipped);
    if (autoFlipTimeoutId) {
      clearTimeout(autoFlipTimeoutId);
      setAutoFlipTimeoutId(null);
    }
    if (setSwiperUsed !== undefined && swiperUsed === false) {
      setSwiperUsed(true);
    }
  };

  // track swiperUsed state
  const swiperUsedRef = useRef(swiperUsed);
  useEffect(() => {
    swiperUsedRef.current = swiperUsed;
  }, [swiperUsed]);

  // auto-flip card, after autoflip ms
  useEffect(() => {
    if (autoflip && !autoFlipTimeoutId && !isFlippedByTimer) {
      const timeoutId = setTimeout(() => {
        if (!swiperUsedRef.current) {
          setIsFlipped(true);
          setIsFlippedByTimer(true);
        }
      }, autoflip);
      if (typeof timeoutId === "number") {
        setAutoFlipTimeoutId(timeoutId);
      }
    }
    return () => {
      if (autoFlipTimeoutId) {
        clearTimeout(autoFlipTimeoutId);
        setAutoFlipTimeoutId(null);
      }
    };
  }, [autoflip, autoFlipTimeoutId, isFlippedByTimer]);

  const markdownProps = {
    linkTarget: "_blank",
    skipHtml: false,
    remarkPlugins: [remarkMath, remarkGfm, remarkBreaks],
    rehypePlugins: [rehypeKatex],
    components: {
      code: CodeComponent,
    },
  };

  return (
    <div
      className={
        styles.flashcard +
        " " +
        (isFlipped ? styles.flipped : "") +
        " " +
        (size === "small" ? styles.small : "")
      }
      onClick={flipCard}
    >
      <div className={styles.flashcard__front}>
        <ReactMarkdown {...markdownProps}>{front}</ReactMarkdown>
        {hint && (
          <div className={styles.flashcard__hint}>
            <p>Tap to flip</p>
          </div>
        )}
      </div>
      <div className={styles.flashcard__back}>
        <ReactMarkdown {...markdownProps}>{back}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Flashcard;
