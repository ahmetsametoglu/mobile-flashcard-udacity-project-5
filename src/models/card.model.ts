export interface ICard {
  _id: string;
  question: string;
  answer: Answer;
}

export enum Answer {
  Correct,
  Wrong
}
