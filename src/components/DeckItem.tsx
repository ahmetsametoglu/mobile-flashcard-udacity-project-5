import React, { FC } from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { IDeck } from "../models/deck.model";
import { Colors } from "../utils/color";

interface IProps {
  deck: IDeck;
}

const DeckItem: FC<IProps> = props => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{props.deck.title}</Text>
      <Text style={styles.cardNumber}>{`${
        props.deck.cardList.length
      } cards`}</Text>
    </View>
  );
};

const styles = StyleSheet.create<{
  card: ViewStyle;
  title: TextStyle;
  cardNumber: TextStyle;
}>({
  card: {
    borderBottomWidth: 2,
    borderColor: Colors.thirdColor,
    height: 150,
    justifyContent: "center"
  },
  title: {
    color: Colors.primaryColor,
    textAlign: "center",
    fontSize: 24
  },
  cardNumber: {
    color: Colors.secondaryColor,
    textAlign: "center",
    fontSize: 19,
    marginTop: 3
  }
});

export default DeckItem;
