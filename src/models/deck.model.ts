import { ICard } from "./card.model";

export type IDeck = {
  _id: string;
  title: string;
  cards: ICard[];
};
