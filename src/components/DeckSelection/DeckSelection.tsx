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

/**
 * DeckSelection component, displays a list of decks
 * @param props - DeckSelectionProps
 * @param props.preview - Whether to display a preview of the decks (default: true)
 * @todo - Add pagination
 * @todo - Add search
 * @todo - Display user's decks first (from users -> decks subcollection)
 */
const DeckSelection = (props: DeckSelectionProps) => {
  const { preview = true } = props;

  const decks = useDecks();
  const sortedDecks = [...decks].sort(
    (a: Deck, b: Deck) => b.userCount - a.userCount
  );

  return (
    <div className={styles.deckselection}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        className={styles.deckselection__title}
      >
        Popular Decks
      </motion.h2>
      {decks && sortedDecks && (
        <div
          className={`${styles.deckselection__decks} ${
            !preview && styles.nopreview
          }`}
        >
          {sortedDecks.map((deck: Deck, key: number) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.25,
                delay: Math.min(0.1 + key * 0.1, 0.5),
              }}
              className={styles.deckselection__deck}
            >
              <DeckPreview deck={deck} preview={preview} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeckSelection;
