declare module "*.module.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare interface Deck {
  id: string;
  ref: any;
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
