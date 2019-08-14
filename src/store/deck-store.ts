import { DeckService } from "../utils/api";
import { IDeck } from "../models/deck.model";
import { ActionType } from "./action-type";
import { Reducer, Dispatch } from "react";
import { ICard } from "../models/card.model";

//#region models

export type IDecksState = {
  deckList: IDeck[];
};

type IDeckPayload = {
  deckList?: IDeck[];
  newDeck?: IDeck;
  removeDeckId?: string;
  newCard?: ICard;
  currentDeckId?: string;
};

type IDecksAction = {
  type: ActionType;
  payload: IDeckPayload | null;
};

//#endregion models

export class DecksAction {
  constructor(private dispatch: Dispatch<IDecksAction>) {}

  public async fetchDeckList() {
    const deckList = await DeckService.getDeckList();

    console.log("[Decks Action]: fetchDeckList");

    return this.dispatch({
      type: "FetchDeckList",
      payload: { deckList: [...deckList] }
    });
  }

  public async addDeck(deckTitle: string) {
    const newDeck = await DeckService.addDeck(deckTitle);
    console.log("newDeck:", newDeck);
    this.dispatch({
      type: "AddDeckToList",
      payload: { newDeck: newDeck }
    });

    return newDeck;
  }

  public async removeDeck(id: string) {
    const isProcessSuccess = await DeckService.removeDeck(id);

    if (isProcessSuccess)
      return this.dispatch({
        type: "RemoveDeck",
        payload: { removeDeckId: id }
      });
  }

  public async addCard(deckId: string, question: string, answer: string) {
    const newCard = await DeckService.addCard(deckId, question, answer);
    this.dispatch({
      type: "AddCardToDeck",
      payload: { newCard: newCard, currentDeckId: deckId }
    });

    return newCard;
  }
}

export const initialDecksState: IDecksState = { deckList: [] };

export const decksReducer: Reducer<IDecksState, IDecksAction> = (
  state = initialDecksState,
  action
) => {
  console.log(`[Decks Reducer]: ${action.type}`);

  switch (action.type) {
    case "FetchDeckList":
      const deckList = action.payload.deckList;

      if (!!deckList) {
        return { ...state, deckList: [...deckList] };
      } else {
        return { ...state };
      }

    case "AddDeckToList":
      const newDeck = action.payload.newDeck;
      if (!!newDeck) {
        state.deckList = [...state.deckList, newDeck];
      }
      return { ...state };

    case "RemoveDeck":
      const removeDeckId = action.payload.removeDeckId;
      const removeDeckIndex = state.deckList.findIndex(
        d => d._id === removeDeckId
      );
      if (removeDeckIndex !== -1) {
        state.deckList.splice(removeDeckIndex, 1);
      }
      return { ...state };

    case "AddCardToDeck":
      const currentDeckId = action.payload.currentDeckId;
      const newCard = action.payload.newCard;
      if (!!newCard) {
        const deckIndex = state.deckList.findIndex(
          d => d._id === currentDeckId
        );
        state.deckList[deckIndex].cards.push(newCard);
      }
      return { ...state };
  }
};
