import React, { FC, Fragment } from "react";
import { View, Text } from "react-native";
import DeckList from "../components/DeckList";

const Decks: FC = () => {
  console.log("[Decks Screen]: init");

  return (
    <View style={{ flex: 1 }}>
      <DeckList />
    </View>
  );
};

export default Decks;
