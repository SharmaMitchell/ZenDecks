declare module "*.module.scss" {
  const content: { [className: string]: string };
  export default content;
}

/**
 * Represents a deck of flashcards.
 *
 * @interface Deck
 * @property {string} id - The unique identifier for the deck.
 * @property {string} path - The path to the deck.
 * @property {number} created - The timestamp of when the deck was created.
 * @property {string} title - The title of the deck.
 * @property {string} description - The description of the deck.
 * @property {string[]} [tags] - The tags associated with the deck.
 * @property {boolean} public - Whether the deck is public or not.
 * @property {string} authorName - The name of the author of the deck.
 * @property {string} authorID - The unique identifier of the author of the deck.
 * @property {Card[]} [cards] - The cards in the deck.
 * @property {boolean} [allCardsLoaded] - Whether all the cards in the deck have been loaded.
 * @property {number} [rating] - The rating of the deck.
 * @property {number} [ratingCount] - The number of ratings the deck has received.
 * @property {number} cardCount - The number of cards in the deck.
 * @property {number} [userCount] - The number of users who have used the deck.
 */
declare interface Deck {
  id: string;
  path: string;
  created: number; // number for timestamp
  title: string;
  description: string;
  tags?: string[];
  public: boolean;
  authorName: string;
  authorID: string;
  cards?: Card[];
  allCardsLoaded?: boolean;
  rating?: number;
  ratingCount?: number;
  cardCount: number;
  userCount?: number;
}

/**
 * A flashcard.
 *
 * @interface Card
 * @property {string} [id] - The unique identifier for the card.
 * @property {string} front - The front side of the card.
 * @property {string} back - The back side of the card.
 */
declare interface Card {
  id?: string;
  front: string;
  back: string;
}

/**
 * A comment left by a user.
 *
 * @interface UserComment
 * @property {string} authorID - The unique identifier of the author of the comment.
 * @property {string} authorName - The name of the author of the comment.
 * @property {string} content - The content of the comment.
 * @property {Date} date - The date the comment was posted.
 */
declare interface UserComment {
  authorID: string;
  authorName: string;
  content: string;
  date: Date;
}
