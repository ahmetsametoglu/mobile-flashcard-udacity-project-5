import React, { FC, useState } from "react";
import {
  Text,
  StyleSheet,
  TextStyle,
  TextInput,
  ViewStyle,
  TouchableHighlight,
  View
} from "react-native";
import { Colors } from "../utils/color";
import { INavigationProp } from "../models/props.model";
import { useStateValue } from "../contexts/state-context";
import { useAppValue } from "../contexts/app-context";
import { NavigationPages } from "../navigators/navigation-pages";
import KeyboardView from "../hoc/keyboard-view";

interface IProps extends INavigationProp {}
const AddDeck: FC<IProps> = props => {
  const [deckTitle, setDeckTitle] = useState("");
  const { deckAction } = useStateValue();
  const { appAction } = useAppValue();

  const onSubmitPage = () => {
    console.log("onSubmitPage");

    if (deckTitle !== "") {
      appAction.showLoading("saving...");
      deckAction
        .addDeck(deckTitle)
        .then(newDeck => {
          appAction.hideLoading();
          setDeckTitle("");
          props.navigation.navigate("Decks");
          props.navigation.push(NavigationPages.DeckMenu, {
            deckId: newDeck._id,
            title: newDeck.title
          });
        })
        .catch(_ => {
          appAction.hideLoading();
        });
    }
  };

  return (
    <KeyboardView>
      <View style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck ?</Text>
        <TextInput
          style={styles.input}
          placeholder="Deck Title"
          placeholderTextColor={Colors.grey}
          onSubmitEditing={onSubmitPage}
          value={deckTitle}
          onChangeText={value => {
            setDeckTitle(value);
          }}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={onSubmitPage}
          underlayColor={Colors.thirdColor}
        >
          <Text style={{ color: Colors.white, fontSize: 20 }}>Submit</Text>
        </TouchableHighlight>
      </View>
    </KeyboardView>
  );
};

const styles = StyleSheet.create<{
  container: ViewStyle;
  title: TextStyle;
  input: TextStyle;
  button: ViewStyle;
}>({
  container: {
    flex: 1,
    alignItems: "center",
    margin: 10
  },
  title: {
    margin: 30,
    fontSize: 44,
    textAlign: "center"
  },
  input: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 18,
    marginTop: 40,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    flexDirection: "row",
    borderRadius: 5,
    width: "90%"
  },
  button: {
    marginTop: 50,
    backgroundColor: Colors.primaryColor,
    height: 50,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  }
});

export default AddDeck;
