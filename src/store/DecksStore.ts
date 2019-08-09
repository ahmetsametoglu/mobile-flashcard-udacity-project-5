import { DeckService } from "./../utils/api";
import { IDeck } from "./../models/deck.model";
import { ActionType } from "./ActionType";
import { Reducer, Dispatch } from "react";

//#region models

export interface IDecksState {
  deckList: IDeck[];
}

interface IDeckPayload {
  deckList?: IDeck[];
  newDeck?: IDeck;
  removeDeckId?: string;
}

interface IDecksAction {
  type: ActionType;
  payload: IDeckPayload | null;
}

//#endregion models

export class DecksAction {
  constructor(private dispatch: Dispatch<IDecksAction>) {}

  public async fetchDeckList() {
    const deckList = await DeckService.getDeckList();

    console.log("[Decks Action]: fetchDeckList");

    return this.dispatch({
      type: ActionType.FetchDeckList,
      payload: { deckList: deckList }
    });
  }

  public async addDeck(deckTitle: string) {
    const newDeck = await DeckService.addDeck(deckTitle);
    console.log("newDeck:", newDeck);
    this.dispatch({
      type: ActionType.AddDeckToList,
      payload: { newDeck: newDeck }
    });

    return newDeck;
  }

  public async removeDeck(id: string) {
    const isProcessSuccess = await DeckService.removeDeck(id);

    if (isProcessSuccess)
      return this.dispatch({
        type: ActionType.RemoveDeck,
        payload: { removeDeckId: id }
      });
  }
}

export const initialDecksState: IDecksState = { deckList: [] };

export const decksReducer: Reducer<IDecksState, IDecksAction> = (
  state = initialDecksState,
  action
) => {
  console.log(`[Decks Reducer]: ${ActionType[action.type]}`);

  switch (action.type) {
    case ActionType.FetchDeckList:
      const deckList = action.payload.deckList;

      if (!!deckList) {
        state.deckList = deckList;
      }
      return { ...state };

    case ActionType.AddDeckToList:
      const newDeck = action.payload.newDeck;
      if (!!newDeck) {
        state.deckList = [...state.deckList, newDeck];
      }
      return { ...state };

    case ActionType.RemoveDeck:
      const removeDeckId = action.payload.removeDeckId;
      const removeDeckIndex = state.deckList.findIndex(
        d => d._id === removeDeckId
      );
      if (removeDeckIndex !== -1) {
        state.deckList.splice(removeDeckIndex, 1);
      }
      return { ...state };
  }
};
