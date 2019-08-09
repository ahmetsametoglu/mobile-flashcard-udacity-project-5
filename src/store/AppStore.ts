import { ActionType } from "./ActionType";
import { Dispatch, Reducer } from "react";

//#region models
export interface IAppState {
  showLoading: boolean;
  loadingText: string;
}

interface IAppPayload {
  loadingText: string;
}

interface IAppAction {
  type: ActionType;
  payload?: IAppPayload;
}
//#endregion models

export class AppAction {
  constructor(private dispatch: Dispatch<IAppAction>) {}

  public showLoading(text?: string) {
    return this.dispatch({
      type: ActionType.ShowLoading,
      payload: { loadingText: text }
    });
  }

  public hideLoading(text?: string) {
    return this.dispatch({
      type: ActionType.HideLoading
    });
  }
}

export const initialAppState: IAppState = {
  showLoading: false,
  loadingText: null
};

export const appReducer: Reducer<IAppState, IAppAction> = (
  state = initialAppState,
  action
) => {
  console.log(`[App Reducer]: ${ActionType[action.type]}`);

  switch (action.type) {
    case ActionType.ShowLoading:
      return {
        ...state,
        showLoading: true,
        loadingText: action.payload.loadingText
      };

    case ActionType.HideLoading:
      return { ...state, showLoading: false, loadingText: null };

    default:
      return { ...state };
  }
};
