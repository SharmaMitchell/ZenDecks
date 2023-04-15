import React from "react";
import styles from "./About.module.scss";
import { motion } from "framer-motion";

interface AboutProps {
  extended?: boolean;
}

/**
 * About component: Displays information about the app
 * @todo Animate on mount with Framer Motion
 * @todo Fix navigation to this section (doesn't work, probably bc of hash with react router)
 * @todo Add graphs/images for SRS alogrithm
 * @todo Revise about text - foxus more on functionality for those unfamiliar with SRS
 */
const About = (props: AboutProps) => {
  const { extended } = props;
  return (
    <div className={styles.about}>
      {extended ? (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className={styles.about__title}
        >
          About
        </motion.h2>
      ) : null}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.2 }}
      >
        <h2 className={styles.about__title__subtitle}>
          Algorithm-powered Learning
        </h2>
        <p>
          ZenDecks uses a powerful algorithm to help you learn faster and more
          efficiently. The algorithm is based on the{" "}
          <a
            href="https://en.wikipedia.org/wiki/Spaced_repetition"
            target="_blank"
            rel="noopener noreferrer"
          >
            spaced repetition
          </a>{" "}
          learning technique, which has been proven to be the most effective way
          to learn and retain information.
        </p>
        <p>
          As you study, ZenDecks will automatically adjust the frequency of your
          reviews, honing in on difficult cards and focussing less on easy
          cards. This means that you'll spend less time studying, and you'll
          remember more.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.225 }}
      >
        <h2 className={styles.about__title__subtitle}>Free and Open Source</h2>
        <p>
          ZenDecks is completely free and open source. We don't collect any user
          information, and we don't show any ads. We also don't have any
          paywalls or premium features. We believe that education should be free
          and accessible to everyone.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.275 }}
      >
        <h2 className={styles.about__title__subtitle}>
          Import/Export Compatible
        </h2>
        <p>
          ZenDecks is compatible with a wide range of import and export formats,
          including Quizlet, Anki, Excel, and more. You can also export your
          decks to a CSV file, which you can then import into other apps.
        </p>
      </motion.div>

      {extended ? (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.325 }}
        >
          <h2 className={styles.about__title__subtitle}>
            Made with ♥️ in Houston
          </h2>
          <p>
            ZenDecks was created by Mitchell Sharma, a Software Engineer and
            language-learning hobbyist from Houston, TX. After using online
            flashcard apps and spaced repetition systems for 10+ years, for
            everything from SAT cramming to studying Japanese vocabulary,
            Mitchell sought to build the best and most versatile flashcard app
            possible.
          </p>
          <p>
            The resulting Next-Gen flashcard app would boast a rich feature set
            challenging the likes of Anki, but with an intuitive UI, seamless
            first-time setup process, and built-in community mnemonic support -
            all backed by the open source community.
          </p>
          <p>
            Development began in March 2023, and the app is still in a very
            early public Alpha stage, with many features to come. If you’d like
            to support the development of the app, you can send a tip/donation
            to the lead developer, Mitchell, via{" "}
            <a
              target="blank"
              rel="noreferrer"
              href="https://paypal.me/tipmitchell"
            >
              PayPal
            </a>
            . Open source contributions are also welcome (see{" "}
            <a
              target="blank"
              rel="noreferrer"
              href="https://github.com/SharmaMitchell/ZenDecks"
            >
              GitHub
            </a>{" "}
            for details).
          </p>
        </motion.div>
      ) : null}
    </div>
  );
};

export default About;
