import React, { createContext, useReducer, useEffect } from "react";
import {
  DecksReducer,
  initialDecksState,
  DecksAction,
  IDecksState
} from "../store/DecksStore";

export const DecksContext = createContext<IDecksState>(initialDecksState);

const DecksContextProvider = props => {
  console.log("[DecksContext]: init");

  const [decksState, dispatch] = useReducer(DecksReducer, initialDecksState);

  useEffect(() => {
    console.log("[DecksContext]: useEffect fetchDeckList");
    new DecksAction(dispatch).fetchDeckList(); // fetching data
  }, []);

  return (
    <DecksContext.Provider value={decksState}>
      {props.children}
    </DecksContext.Provider>
  );
};

export default DecksContextProvider;
