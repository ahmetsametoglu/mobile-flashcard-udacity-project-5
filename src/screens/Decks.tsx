import React, { FC, Fragment } from "react";
import { View, Text } from "react-native";
import DeckList from "../components/DeckList";
import { INavigationProp } from "../models/props.model";

interface IProps extends INavigationProp {}

const Decks: FC<IProps> = props => {
  console.log("[Decks Screen]: init");
  return (
    <View style={{ flex: 1 }}>
      <DeckList navigation={props.navigation} />
    </View>
  );
};

export default Decks;
