import React, { FC } from "react";
import { View, Text, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { INavigationProp } from "../models/props.model";
import { NavigationPages } from "../navigators/NavigationPages";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Colors } from "../utils/color";
import { useStateValue } from "../contexts/StateContext";
import { useAppValue } from "../contexts/AppContext";

interface IProps extends INavigationProp {}
const DeckMenu: FC<IProps> = props => {
  const { state, deckAction } = useStateValue();
  const { appAction } = useAppValue();

  const { navigation } = props;
  const { deckId } = navigation.state.params;

  const selectedDeck = state.deckList.find(d => d._id == deckId);

  const onDeleteDeck = () => {
    appAction.showLoading("removing...");
    deckAction
      .removeDeck(deckId)
      .then(_ => {
        appAction.hideLoading();
        props.navigation.navigate(NavigationPages.Home);
      })
      .catch(_ => {
        appAction.hideLoading();
      });
  };

  return (
    !!selectedDeck && (
      <View style={{ flex: 1, margin: 40 }}>
        <View style={styles.infoSection}>
          <Text style={styles.title}>{selectedDeck.title}</Text>
          <Text style={styles.description}>{`${
            selectedDeck.cardList.length
          } cards`}</Text>
        </View>
        <View style={styles.buttonSection}>
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
          <TouchableHighlight
            style={[styles.button, { borderColor: Colors.white }]}
            onPress={onDeleteDeck}
          >
            <Text style={[styles.buttonLabel, { color: Colors.red }]}>
              Delete Deck
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create<{
  infoSection: ViewStyle;
  buttonSection: ViewStyle;
  title: TextStyle;
  description: TextStyle;
  button: ViewStyle;
  buttonLabel: TextStyle;
}>({
  infoSection: {
    flex: 5,
    paddingBottom: 90,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonSection: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center"
  },
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
