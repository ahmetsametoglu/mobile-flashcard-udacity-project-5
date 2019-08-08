import React, { createContext, useEffect, useContext, useReducer } from "react";
import {
  decksReducer,
  initialDecksState,
  IDecksState,
  DecksAction
} from "../store/DecksStore";

export const StateContext = createContext<{
  state: IDecksState;
  deckAction: DecksAction;
}>(null);

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

export const useStateValue = () => useContext(StateContext);
