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
    return this.dispatch({
      type: ActionType.AddDeckToList,
      payload: { newDeck: newDeck }
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
  }
};
