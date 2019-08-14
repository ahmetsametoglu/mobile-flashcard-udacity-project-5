import React, { createContext, useContext, useReducer } from "react";
import {
  AppAction,
  IAppState,
  appReducer,
  initialAppState
} from "../store/app-store";

interface IAppContext {
  state: IAppState;
  appAction: AppAction;
}

export const AppContext = createContext<IAppContext>(null);
export const useAppValue = () => useContext(AppContext);

const AppContextProvider = props => {
  console.log("[AppContext]: init");

  const [appState, dispatch] = useReducer(appReducer, initialAppState);
  let appAction = new AppAction(dispatch);

  return (
    <AppContext.Provider value={{ state: appState, appAction }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
