import React, { useEffect } from "react";
import DeckPreview from "../DeckPreview/DeckPreview";
import styles from "./DeckSelection.module.scss";
import { motion } from "framer-motion";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { firestore } from "../../components/utils/firebase";
import { useSelector } from "react-redux";
import store from "../../store/store";
import { useDecks } from "../utils/hooks";
import { DocumentData, DocumentReference } from "firebase/firestore";

interface DeckSelectionProps {
  preview?: boolean;
}

interface Deck {
  id: string;
  ref: DocumentReference<DocumentData>;
  title: string;
  description: string;
  tags?: string[];
  public: boolean;
  authorName: string;
  authorID: string;
  cards?: any[];
  rating?: number;
  ratingCount?: number;
  cardCount: number;
  userCount?: number;
}

// const exampleDecks = [
//   {
//     title: "Japanese Software Engineering Vocabulary",
//     description:
//       "A collection of Japanese words and phrases used in software engineering and computer science. Includes words for programming languages, web development, and more.",
//     tags: ["Japanese", "Programming", "Computer Science"],
//     author: "SharmaMitchell",
//     rating: 4.5,
//     numcards: 84,
//     numusers: 16,
//     cards: [
//       {
//         front: "ラフ",
//         back: "rough draft (of a document, design, etc.)",
//       },
//       {
//         front: "通知",
//         back: "notification (e.g. from an app)",
//       },
//       {
//         front: "プロフィール",
//         back: "profile",
//       },
//       {
//         front: "バックエンド",
//         back: "backend",
//       },
//       {
//         front: "フロントエンド",
//         back: "frontend",
//       },
//     ],
//   },

//   // {
//   //   title: "Japanese Software Engineering Vocabulary",
//   //   description:
//   //     "A collection of Japanese words and phrases used in software engineering and computer science. Includes words for programming languages, web development, and more.",
//   //   tags: ["Japanese", "Programming", "Computer Science"],
//   //   author: "SharmaMitchell",
//   //   rating: 4.5,
//   //   numcards: 84,
//   //   numusers: 16,
//   //   cards: [
//   //     {
//   //       front: "ラフ",
//   //       back: "rough draft (of a document, design, etc.)",
//   //     },
//   //     {
//   //       front: "通知",
//   //       back: "notification (e.g. from an app)",
//   //     },
//   //     {
//   //       front: "プロフィール",
//   //       back: "profile",
//   //     },
//   //     {
//   //       front: "バックエンド",
//   //       back: "backend",
//   //     },
//   //     {
//   //       front: "フロントエンド",
//   //       back: "frontend",
//   //     },
//   //   ],
//   // },
//   {
//     title: "Linear Algebra Essentails",
//     description:
//       "Essential linear algebra concepts & formulas. Matrices, vectors, determinants, eigenvalues, eigenvectors, etc.",
//     tags: ["Math", "Linear Algebra"],
//     author: "SharmaMitchell",
//     rating: 5,
//     numcards: 39,
//     numusers: 47,
//     cards: [
//       {
//         front: "Determinant",
//         back: "The determinant of a square matrix is a scalar value that can be computed from the elements of the matrix using a simple formula. The determinant is a useful tool for solving systems of linear equations and for calculating the inverse of a matrix.",
//       },
//       {
//         front: "Eigenvalue",
//         back: "An eigenvalue of a square matrix is a scalar value that, when multiplied by the matrix, results in a new matrix in which each element is multiplied by the same scalar value.",
//       },
//       {
//         front: "Eigenvector",
//         back: "An eigenvector of a square matrix is a vector that, when multiplied by the matrix, results in a new vector that is multiplied by the same scalar value as the original eigenvector.",
//       },
//       {
//         front: "Matrix",
//         back: "A matrix is a rectangular array of numbers, symbols, or expressions, arranged in rows and columns.",
//       },
//       {
//         front: "Vector",
//         back: "A vector is a quantity that has both magnitude and direction.",
//       },
//     ],
//   },
//   // {
//   //   title: "Linear Algebra Essentails",
//   //   description:
//   //     "Essential linear algebra concepts & formulas. Matrices, vectors, determinants, eigenvalues, eigenvectors, etc.",
//   //   tags: ["Math", "Linear Algebra"],
//   //   author: "SharmaMitchell",
//   //   rating: 5,
//   //   numcards: 39,
//   //   numusers: 47,
//   //   cards: [
//   //     {
//   //       front: "Determinant",
//   //       back: "The determinant of a square matrix is a scalar value that can be computed from the elements of the matrix using a simple formula. The determinant is a useful tool for solving systems of linear equations and for calculating the inverse of a matrix.",
//   //     },
//   //     {
//   //       front: "Eigenvalue",
//   //       back: "An eigenvalue of a square matrix is a scalar value that, when multiplied by the matrix, results in a new matrix in which each element is multiplied by the same scalar value.",
//   //     },
//   //     {
//   //       front: "Eigenvector",
//   //       back: "An eigenvector of a square matrix is a vector that, when multiplied by the matrix, results in a new vector that is multiplied by the same scalar value as the original eigenvector.",
//   //     },
//   //     {
//   //       front: "Matrix",
//   //       back: "A matrix is a rectangular array of numbers, symbols, or expressions, arranged in rows and columns.",
//   //     },
//   //     {
//   //       front: "Vector",
//   //       back: "A vector is a quantity that has both magnitude and direction.",
//   //     },
//   //   ],
//   // },
// ];

const DeckSelection = (props: DeckSelectionProps) => {
  const { preview = true } = props;

  const decks = useDecks();

  return (
    <div className={styles.deckselection}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className={styles.deckselection__title}
      >
        Decks
      </motion.h2>
      {decks && (
        <div
          className={`${styles.deckselection__decks} ${
            !preview && styles.nopreview
          }`}
        >
          {decks.map((deck: Deck, key: number) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 + key * 0.1 }}
              className={styles.deckselection__deck}
            >
              <DeckPreview
                title={deck.title}
                description={deck.description}
                tags={deck.tags}
                author={deck.authorName}
                rating={deck.rating}
                numRatings={deck.ratingCount}
                numcards={deck.cardCount}
                numusers={deck.userCount}
                preview={preview}
                deckRef={deck.ref}
              />
            </motion.div>
          ))}
        </div>
      )}
      {/* <div
        className={`${styles.deckselection__decks} ${
          !preview && styles.nopreview
        }`}
      >
        {exampleDecks.map((deck, key) => (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 + key * 0.1 }}
            className={styles.deckselection__deck}
          >
            <DeckPreview {...deck} preview={preview} />
          </motion.div>
        ))}
      </div> */}
    </div>
  );
};

export default DeckSelection;
