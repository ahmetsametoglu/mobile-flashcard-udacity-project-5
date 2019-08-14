import { ActionType } from "./action-type";
import { Dispatch, Reducer } from "react";

//#region models
export type IAppState = {
  showLoading: boolean;
  loadingText: string;
};

type IAppPayload = {
  loadingText: string;
};

type IAppAction = {
  type: ActionType;
  payload?: IAppPayload;
};
//#endregion models

export class AppAction {
  constructor(private dispatch: Dispatch<IAppAction>) {}

  public showLoading(text?: string) {
    return this.dispatch({
      type: "ShowLoading",
      payload: { loadingText: text }
    });
  }

  public hideLoading() {
    return this.dispatch({
      type: "HideLoading"
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
  console.log(`[App Reducer]: ${action.type}`);

  switch (action.type) {
    case "ShowLoading":
      return {
        ...state,
        showLoading: true,
        loadingText: action.payload.loadingText
      };

    case "HideLoading":
      return { ...state, showLoading: false, loadingText: null };

    default:
      return { ...state };
  }
};
