import React, { FC } from "react";
import {
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity
} from "react-native";
import { IDeck } from "../models/deck.model";
import { Colors } from "../utils/color";
import { INavigationProp } from "../models/props.model";
import { NavigationPages } from "../navigators/NavigationPages";

interface IProps extends INavigationProp {
  deck: IDeck;
}

const DeckItem: FC<IProps> = props => {
  const { deck, navigation } = props;
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        navigation.push(NavigationPages.DeckMenu, {
          deckId: deck._id,
          title: deck.title
        });
      }}
    >
      <Text style={styles.title}>{deck.title}</Text>
      <Text style={styles.cardNumber}>{`${deck.cards.length} cards`}</Text>
    </TouchableOpacity>
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
