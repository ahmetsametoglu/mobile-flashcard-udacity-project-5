import React from "react";
import { View, Text } from "react-native";
import DeckList from "../components/deck-list";
import { INavigationProp } from "../models/props.model";

type Props = {} & INavigationProp;

const Decks = (props: Props) => {
  console.log("[Decks Screen]: init");
  return (
    <View style={{ flex: 1 }}>
      <DeckList navigation={props.navigation} />
    </View>
  );
};

export default Decks;
