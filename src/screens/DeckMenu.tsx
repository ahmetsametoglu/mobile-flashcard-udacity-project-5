import React, { FC, useReducer } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextStyle,
  ViewStyle
} from "react-native";
import { INavigationProp } from "../models/props.model";
import { DecksReducer, initialDecksState } from "../store/DecksStore";
import { NavigationPages } from "../navigators/NavigationPages";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Colors } from "../utils/color";

interface IProps extends INavigationProp {}
const DeckMenu: FC<IProps> = props => {
  const { navigation } = props;
  const { deckId } = navigation.state.params;
  const [state] = useReducer(DecksReducer, initialDecksState);

  const selectedDeck = state.deckList.find(d => d._id == deckId);

  return (
    <View style={{ flex: 1, margin: 40 }}>
      <View
        style={{
          flex: 5,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={styles.title}>{selectedDeck.title}</Text>
        <Text style={styles.description}>{`${
          selectedDeck.cardList.length
        } cards`}</Text>
      </View>
      <View
        style={{
          flex: 3,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <TouchableHighlight
          style={[styles.button, { backgroundColor: Colors.white }]}
          onPress={() => navigation.push(NavigationPages.AddCard)}
        >
          <Text style={[styles.buttonLabel, { color: Colors.black }]}>
            Add Card
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.button, { backgroundColor: Colors.black }]}
          onPress={() =>
            navigation.push(NavigationPages.Quiz, {
              title: selectedDeck.title
            })
          }
        >
          <Text style={[styles.buttonLabel, { color: Colors.white }]}>
            Start Quiz
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create<{
  title: TextStyle;
  description: TextStyle;
  button: ViewStyle;
  buttonLabel: TextStyle;
}>({
  title: {
    fontSize: 40,
    marginBottom: 15,
    fontWeight: "400"
  },
  description: {
    fontSize: 25,
    color: Colors.grey
  },
  button: {
    flexDirection: "row",
    borderWidth: 1,
    height: 60,
    borderColor: Colors.black,
    borderRadius: 5,
    margin: 8,
    width: "100%"
  },
  buttonLabel: {
    flex: 1,
    flexDirection: "row",
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "normal",
    fontSize: 20
  }
});

export default DeckMenu;
