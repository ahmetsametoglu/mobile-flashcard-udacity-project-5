import React, { FC, useContext } from "react";
import { View, Text, FlatList } from "react-native";
import { DecksContext } from "../contexts/DecksContext";
import DeckItem from "./DeckItem";

const DeckList: FC = () => {
  console.log("[DeckList component]: init");

  const context = useContext(DecksContext);

  return (
    <FlatList
      data={context.deckList.map(d => {
        return { ...d, key: d._id };
      })}
      renderItem={({ item }) => <DeckItem deck={item} />}
    />
  );
};

export default DeckList;
