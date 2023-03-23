declare module "*.module.scss" {
  const content: { [className: string]: string };
  export default content;
}

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

declare interface Card {
  front: string;
  back: string;
}

declare interface UserComment {
  authorID: string;
  authorName: string;
  content: string;
  date: Date;
}
