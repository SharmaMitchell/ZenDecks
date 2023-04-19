import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import styles from "./CardPreview.module.scss";

type CodeProps = {
  node?: any;
  inline?: any;
  className?: any;
  children?: any;
};

/**
 * Code component for ReactMarkdown
 *
 * @param CodeProps - The props object for the Code component
 * @param CodeProps.node - The node to render
 * @param CodeProps.inline - Whether the node is inline
 * @param CodeProps.className - The class name of the node
 * @param CodeProps.children - The children of the node
 * @returns The rendered node (either a code block or inline code)
 */
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

const markdownProps = {
  linkTarget: "_blank",
  skipHtml: false,
  remarkPlugins: [remarkMath, remarkGfm, remarkBreaks],
  rehypePlugins: [rehypeKatex],
  components: {
    code: CodeComponent,
  },
};

interface CardPreviewProps {
  card: Card;
}

/**
 * CardPreview component, displays a card's front and back
 *
 * @param props - The props object for the CardPreview component
 * @param props.card - The card to display
 */
const CardPreview = (props: CardPreviewProps) => {
  const { card } = props;
  return (
    <div className={styles.card}>
      <div className={styles.card__front__wrapper}>
        <ReactMarkdown {...markdownProps} className={styles.card__front}>
          {card.front}
        </ReactMarkdown>
      </div>
      <div className={styles.card__back__wrapper}>
        <ReactMarkdown {...markdownProps} className={styles.card__back}>
          {card.back}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default CardPreview;
