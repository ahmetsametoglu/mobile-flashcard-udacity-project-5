import { AsyncStorage } from "react-native";
const uuidv4 = require("uuid/v4");

import { ICard } from "./../models/card.model";
import { IDeck } from "./../models/deck.model";

let _deckList: IDeck[] = [
  {
    _id: "0",
    title: "how well do you know the world",
    cards: [
      {
        _id: "01",
        question: "How many stars are there on the flag of China?",
        answer: "5"
      },
      {
        _id: "02",
        question: "What is the currency of Mongolia?",
        answer: "Tugrik"
      },
      {
        _id: "03",
        question:
          "In which country is there a natural gas pit nicknamed the ‘Door to Hell’ that has been on fire since 1971?",
        answer: "Turkmenistan"
      },
      {
        _id: "04",
        question:
          "In 2013 which two airlines merged to become the world’s largest airline?",
        answer: "American Airlines and US Airways"
      },
      {
        _id: "05",
        question:
          "Which country has more lakes than the rest of the world combined?",
        answer: "Canada"
      },
      {
        _id: "06",
        question: "Which country has the world's highest waterfall ?",
        answer: "Venezuela"
      }
    ]
  },
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
    return new Promise((res, rej) => {
      setTimeout(async () => {
        try {
          const value = await AsyncStorage.getItem("decks");

          if (value !== null) {
            const data = JSON.parse(value) as IDeck[];
            _deckList = data.map(x => Object.assign({}, x));
          }
          res([..._deckList]);
        } catch (error) {
          rej(error);
        }
      }, 1000);
    });
  }

  static addDeck(title: string): Promise<IDeck> {
    return new Promise((res, rej) => {
      setTimeout(async () => {
        const newDeck: IDeck = {
          _id: uuidv4(),
          title: title,
          cards: []
        };
        const deckList = [..._deckList, newDeck];

        try {
          await this.saveDeckList(deckList);
          _deckList = [...deckList];
          res({ ...newDeck });
        } catch (error) {
          rej(error);
          console.log("error:", error);
        }
      }, 1000);
    });
  }

  static removeDeck(deckId: string): Promise<boolean> {
    return new Promise((res, rej) => {
      setTimeout(async () => {
        const deckList = [..._deckList];

        const deckIndex = deckList.findIndex(d => d._id === deckId);
        if (deckIndex === -1) {
          rej("deck not found");
        }

        try {
          deckList.splice(deckIndex, 1);
          await this.saveDeckList(deckList);
          _deckList = [...deckList];
          res(true);
        } catch (error) {
          rej(error);
          console.log("error:", error);
        }
      }, 1000);
    });
  }

  static addCard(
    deckId: string,
    question: string,
    answer: string
  ): Promise<ICard> {
    return new Promise((res, rej) => {
      setTimeout(async () => {
        const deckList = [..._deckList];
        const deckIndex = deckList.findIndex(d => d._id === deckId);
        if (deckIndex === -1) {
          rej("deck not found");
        }
        const newCard: ICard = {
          _id: uuidv4(),
          answer: answer,
          question: question
        };

        try {
          deckList[deckIndex].cards = deckList[deckIndex].cards.concat(newCard);
          await this.saveDeckList(deckList);
          console.log(_deckList[deckIndex].cards.length);
          _deckList = [...deckList];
          res({ ...newCard });
        } catch (error) {
          rej(error);
          console.log("error:", error);
        }
      }, 1000);
    });
  }

  static removeCard(deckId: string, cardId: string): Promise<void> {
    return new Promise((res, rej) => {
      setTimeout(async () => {
        const deckList = [..._deckList];
        const deckIndex = deckList.findIndex(d => d._id === deckId);
        if (deckIndex === -1) {
          rej("deck not found");
        }

        const cardIndex = deckList[deckIndex].cards.findIndex(
          d => d._id === cardId
        );
        if (cardIndex === -1) {
          rej("card not found");
        }
        try {
          deckList[deckIndex].cards.splice(cardIndex, 1);
          await this.saveDeckList(deckList);
          _deckList = [...deckList];
          res();
        } catch (error) {
          rej(error);
          console.log("error:", error);
        }
      }, 1000);
    });
  }

  private static async saveDeckList(deckList: IDeck[]) {
    return await AsyncStorage.setItem("decks", JSON.stringify(deckList));
  }
}
