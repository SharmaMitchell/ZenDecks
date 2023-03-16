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

interface CardPreviewProps {
  card: Card;
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

const markdownProps = {
  linkTarget: "_blank",
  skipHtml: false,
  remarkPlugins: [remarkMath, remarkGfm, remarkBreaks],
  rehypePlugins: [rehypeKatex],
  components: {
    code: CodeComponent,
  },
};

const CardPreview = (props: CardPreviewProps) => {
  const { card } = props;
  return (
    <div className={styles.card}>
      <ReactMarkdown {...markdownProps} className={styles.card__front}>
        {card.front}
      </ReactMarkdown>
      <ReactMarkdown {...markdownProps} className={styles.card__back}>
        {card.back}
      </ReactMarkdown>
    </div>
  );
};

export default CardPreview;
