import React, { FC, useContext } from "react";
import { FlatList } from "react-native";
import { DecksContext } from "../contexts/DecksContext";
import { INavigationProp } from "../models/props.model";
import DeckItem from "./DeckItem";

interface IProps extends INavigationProp {}
const DeckList: FC<IProps> = props => {
  console.log("[DeckList component]: init");

  const { navigation } = props;
  const context = useContext(DecksContext);

  return (
    <FlatList
      data={context.deckList.map(d => {
        return { ...d, key: d._id };
      })}
      renderItem={({ item }) => (
        <DeckItem deck={item} navigation={navigation} />
      )}
    />
  );
};

export default DeckList;
