import React, { FC } from "react";
import { FlatList } from "react-native";
import { INavigationProp } from "../models/props.model";
import DeckItem from "./deck-item";
import { useStateValue } from "../contexts/state-context";

type IProps = {} & INavigationProp;
const DeckList: FC<IProps> = props => {
  console.log("[DeckList component]: init");
  const { state } = useStateValue();

  const { navigation } = props;

  return (
    <FlatList
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
