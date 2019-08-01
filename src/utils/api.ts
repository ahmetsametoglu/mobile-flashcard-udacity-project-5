const uuidv4 = require("uuid/v4");

import { Answer, ICard } from "./../models/card.model";
import { IDeck } from "./../models/deck.model";

let deckList: IDeck[] = [
  {
    _id: "1",
    title: "desks 1",
    cardList: [
      { _id: "11", question: "You are developer", answer: Answer.Correct },
      {
        _id: "12",
        question: "Flutter is better than react-native",
        answer: Answer.Correct
      },
      {
        _id: "13",
        question: "The sun rises from the west",
        answer: Answer.Wrong
      }
    ]
  },
  {
    _id: "2",
    title: "desk 2",
    cardList: [
      { _id: "21", question: "You are developer", answer: Answer.Correct },
      {
        _id: "22",
        question: "Flutter is better than react-native",
        answer: Answer.Correct
      },
      {
        _id: "23",
        question: "The sun rises from the west",
        answer: Answer.Wrong
      }
    ]
  }
];

export class DeckService {
  static getDeckList(): Promise<IDeck[]> {
    return new Promise(res => {
      setTimeout(() => res({ ...deckList }), 1000);
    });
  }

  static addDeck(title: string): Promise<IDeck> {
    return new Promise(res => {
      setTimeout(() => {
        const newDeck: IDeck = {
          _id: uuidv4(),
          title: title,
          cardList: []
        };

        deckList.push(newDeck);
        res(newDeck);
      }, 1000);
    });
  }

  static removeDeck(deckId: string): Promise<void> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        const deckIndex = deckList.findIndex(d => d._id === deckId);
        if (deckIndex === -1) {
          rej("desk not found");
        }

        deckList.splice(deckIndex, 1);
        res();
      }, 1000);
    });
  }

  static addCard(deckId: string, card: ICard): Promise<ICard> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        const deckIndex = deckList.findIndex(d => d._id === deckId);
        if (deckIndex === -1) {
          rej("desk not found");
        }

        card._id = uuidv4();
        deckList[deckIndex].cardList.push(card);

        res(card);
      }, 1000);
    });
  }

  static removeCard(deckId: string, cardId: string): Promise<void> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        const deckIndex = deckList.findIndex(d => d._id === deckId);
        if (deckIndex === -1) {
          rej("desk not found");
        }

        const cardIndex = deckList[deckIndex].cardList.findIndex(
          d => d._id === cardId
        );
        if (cardIndex === -1) {
          rej("card not found");
        }

        deckList[deckIndex].cardList.splice(cardIndex, 1);

        res();
      }, 1000);
    });
  }
}
