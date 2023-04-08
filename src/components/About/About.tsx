import React from "react";
import styles from "./About.module.scss";

/**
 * About component: Displays information about the app
 * @todo Animate on mount with Framer Motion
 * @todo Fix navigation to this section (doesn't work, probably bc of hash with react router)
 * @todo Add graphs/images for SRS alogrithm
 * @todo Revise about text - foxus more on functionality for those unfamiliar with SRS
 */
const About = () => {
  return (
    <div className={styles.about} id="about">
      <h2>Algorithm-powered Learning</h2>
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
        reviews, honing in on difficult cards and focussing less on easy cards.
        This means that you'll spend less time studying, and you'll remember
        more.
      </p>
      <h2>Free and Open Source</h2>
      <p>
        ZenDecks is completely free and open source. We don't collect any user
        information, and we don't show any ads. We also don't have any paywalls
        or premium features. We believe that education should be free and
        accessible to everyone.
      </p>
      <h2>Import/Export Compatible</h2>
      <p>
        ZenDecks is compatible with a wide range of import and export formats,
        including Quizlet, Anki, Excel, and more. You can also export your decks
        to a CSV file, which you can then import into other apps.
      </p>
    </div>
  );
};

export default About;
