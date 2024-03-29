import React, { useRef, useState } from "react";

import Flashcard from "../Flashcard/Flashcard";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./Preview.module.scss";
import { ReactComponent as LeftArrow } from "../../assets/arrow-left-circle.svg";
import { ReactComponent as RightArrow } from "../../assets/arrow-right-circle.svg";

// Example cards
const cards = [
  {
    front: "What is the Taylor series formula?",
    back: "$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!} (x-a)^n$",
  },
  {
    front: "How do you invert a binary tree?",
    back: "Swap the left and right subtrees of every node. Recursive solution:  `def invertTree(self, root: TreeNode) -> TreeNode:`  `if root:`  `root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)`  `return root`",
  },
  {
    front: "生き甲斐",
    back: "いきがい (ikigai): something one lives for; purpose in life",
  },
  {
    front:
      "____, a **biguanide**, is the first-line oral agent for the management of **type 2 diabetes**.",
    back: "Metformin  \n![Metformin Structure](https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Metformin.svg/330px-Metformin.svg.png)",
  },
];

/**
 * Preview component (demo cards carousel shown on home page)
 */
const Preview = () => {
  const navigationPrevRef = useRef(null); // Swiper navigation prev element
  const navigationNextRef = useRef(null); // Swiper navigation next element
  const [swiperInitialized, setSwiperInitialized] = useState(false); // Swiper initialized state for nav buttons
  const [swiperUsed, setSwiperUsed] = useState(false); // Swiper used state for hint, auto card flip, and autoplay

  return (
    <div className={styles.wrapper}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.3 }}
        className={styles.preview__title}
      >
        <h2>Preview</h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.35 }}
        className={styles.swiper__wrapper}
      >
        <div ref={navigationPrevRef}>
          <LeftArrow
            stroke="var(--text-color)"
            style={{
              marginRight: 16,
            }}
            className={styles.swiper__arrow}
          />
        </div>
        <Swiper
          slidesPerView={"auto"}
          loop={true}
          autoplay={{
            // TODO: disable if swiperUsed
            delay: 8000,
            disableOnInteraction: true,
          }}
          modules={[Navigation, Pagination, Autoplay]}
          navigation={
            swiperInitialized && {
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }
          }
          pagination={true}
          className={styles.swiper}
          onSwiper={() => setSwiperInitialized(true)}
          // TODO: set swiperUsed to true if user interacts with swiper
          breakpoints={{
            0: {
              // TODO: justify content space between when multiple cards on screen??
              spaceBetween: 16,
              centeredSlides: true,
            },
            768: {
              spaceBetween: 100,
              centeredSlides: false,
            },
          }}
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index} style={{ width: "auto" }}>
              <Flashcard
                front={card.front}
                back={card.back}
                hint={/*swiperUsed ? false :*/ true}
                // autoflip={4000 + 2 * 4000 * index}
                swiperUsed={swiperUsed}
                setSwiperUsed={setSwiperUsed}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          ref={navigationNextRef}
          className="flex items-center absolute top-0 bottom-0 left-auto right-0 cursor-pointer"
        >
          <RightArrow
            stroke="var(--text-color)"
            style={{
              marginLeft: 16,
            }}
            className={styles.swiper__arrow}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Preview;
