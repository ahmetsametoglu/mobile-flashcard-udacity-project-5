import { ICard } from "./card.model";

export interface IDeck {
  _id: string;
  title: string;
  cardList: ICard[];
}
