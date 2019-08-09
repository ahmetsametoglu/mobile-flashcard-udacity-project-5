const uuidv4 = require("uuid/v4");

import { ICard } from "./../models/card.model";
import { IDeck } from "./../models/deck.model";

let deckList: IDeck[] = [
  {
    _id: "1",
    title: "React",
    cards: [
      {
        _id: "11",
        question: "What is React?",
        answer: "A library for managing user interfaces"
      },
      {
        _id: "12",
        question: "Where do you make Ajax requests in React?",
        answer: "The componentDidMount life-cycle event"
      }
    ]
  },
  {
    _id: "2",
    title: "JavaScript",
    cards: [
      {
        _id: "21",
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared."
      }
    ]
  }
];

export class DeckService {
  static getDeckList(): Promise<IDeck[]> {
    return new Promise(res => {
      setTimeout(() => res([...deckList]), 1000);
    });
  }

  static addDeck(title: string): Promise<IDeck> {
    return new Promise(res => {
      setTimeout(() => {
        const newDeck: IDeck = {
          _id: uuidv4(),
          title: title,
          cards: []
        };

        deckList.push(newDeck);
        res({ ...newDeck });
      }, 1000);
    });
  }

  static removeDeck(deckId: string): Promise<boolean> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        const deckIndex = deckList.findIndex(d => d._id === deckId);
        if (deckIndex === -1) {
          rej(false);
        }

        deckList.splice(deckIndex, 1);
        res(true);
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
        deckList[deckIndex].cards.push(card);

        res({ ...card });
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

        const cardIndex = deckList[deckIndex].cards.findIndex(
          d => d._id === cardId
        );
        if (cardIndex === -1) {
          rej("card not found");
        }

        deckList[deckIndex].cards.splice(cardIndex, 1);

        res();
      }, 1000);
    });
  }
}
