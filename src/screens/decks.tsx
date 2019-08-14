import React, { FC, Fragment } from "react";
import { View, Text } from "react-native";
import DeckList from "../components/deck-list";
import { INavigationProp } from "../models/props.model";

type IProps = {} & INavigationProp;

const Decks: FC<IProps> = props => {
  console.log("[Decks Screen]: init");
  return (
    <View style={{ flex: 1 }}>
      <DeckList navigation={props.navigation} />
    </View>
  );
};

export default Decks;
