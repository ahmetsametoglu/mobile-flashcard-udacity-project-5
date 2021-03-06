import React from "react";
import { FlatList } from "react-native";
import { INavigationProp } from "../models/props.model";
import DeckItem from "./deck-item";
import { useStateValue } from "../contexts/state-context";

type Props = {} & INavigationProp;
const DeckList = (props: Props) => {
  console.log("[DeckList component]: init");
  const { state } = useStateValue();

  const { navigation } = props;

  return (
    <FlatList
      style={{ marginTop: 5 }}
      data={state.deckList.map(d => {
        return { ...d, key: d._id };
      })}
      renderItem={({ item }) => (
        <DeckItem deck={item} navigation={navigation} />
      )}
    />
  );
};

export default DeckList;
