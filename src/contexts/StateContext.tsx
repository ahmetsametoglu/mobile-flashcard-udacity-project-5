import React, { createContext, useEffect, useContext, useReducer } from "react";
import {
  decksReducer,
  initialDecksState,
  IDecksState,
  DecksAction
} from "../store/DecksStore";

interface IStateContext {
  state: IDecksState;
  deckAction: DecksAction;
}

export const StateContext = createContext<IStateContext>(null);
export const useStateValue = () => useContext(StateContext);

const StateContextProvider = props => {
  console.log("[StateContext]: init");

  const [deckState, dispatch] = useReducer(decksReducer, initialDecksState);
  let deckAction = new DecksAction(dispatch);

  useEffect(() => {
    console.log("[StateContext]: useEffect fetchDeckList");
    deckAction.fetchDeckList();
  }, []);

  return (
    <StateContext.Provider value={{ state: deckState, deckAction }}>
      {props.children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
