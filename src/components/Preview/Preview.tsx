import React from "react";
import styles from "./Preview.module.scss";
import Flashcard from "../Flashcard/Flashcard";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

const Preview = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.preview__title}>
        <h2>Preview</h2>
      </div>
      <div className={styles.preview}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
        >
          <Flashcard
            front="What is the Taylor series formula?"
            back="$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!} (x-a)^n$"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
        >
          <Flashcard
            front="How do you invert a binary tree?"
            back="Swap the left and right subtrees of every node.
            Recursive solution:  
            `def invertTree(self, root: TreeNode) -> TreeNode:`  
                `if root:`  
                    `root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)`  
                    `return root`"
          />
        </motion.div>
      </div>
      <div className={styles.preview} style={{ paddingTop: 0 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
        >
          <Flashcard
            front="生き甲斐"
            back="いきがい (ikigai): something one lives for; purpose in life"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
        >
          <Flashcard
            front="____, a **biguanide**, is the first-line oral agent for the management of **type 2 diabetes**."
            back="Metformin  
            ![Metformin Structure](https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Metformin.svg/330px-Metformin.svg.png)"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Preview;
