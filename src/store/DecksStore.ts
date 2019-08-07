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
}

interface IDecksAction {
  type: ActionType;
  payload: IDeckPayload | null;
}

//#endregion models

export class DecksAction {
  constructor(private dispatch: Dispatch<IDecksAction>) {}

  public fetchDeckList = async (): Promise<void> => {
    const deckList = await DeckService.getDeckList();

    console.log("[Decks Action]: fetchDeckList");

    return this.dispatch({
      type: ActionType.FetchDeckList,
      payload: { deckList: deckList }
    });
  };
}

export const initialDecksState: IDecksState = { deckList: [] };

export const DecksReducer: Reducer<IDecksState, IDecksAction> = (
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
    default:
      throw new Error();
  }
};
