import React, { FC, useState } from "react";
import {
  Text,
  StyleSheet,
  TextStyle,
  TextInput,
  ViewStyle,
  KeyboardAvoidingView,
  TouchableHighlight,
  ScrollView,
  View,
  ActivityIndicator
} from "react-native";
import { Colors } from "../utils/color";
import { INavigationProp } from "../models/props.model";
import { useStateValue } from "../contexts/StateContext";
import Loading from "../components/Loading";

interface IProps extends INavigationProp {}
const AddDeck: FC<IProps> = props => {
  const [deckTitle, setDeckTitle] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const { deckAction } = useStateValue();

  const onSubmitPage = () => {
    console.log("onSubmitPage");

    setShowLoading(true);
    deckAction
      .addDeck(deckTitle)
      .then(_ => {
        setShowLoading(false);
        props.navigation.navigate("Decks");
      })
      .catch(_ => {
        setShowLoading(false);
      });
  };

  if (showLoading) {
    return <Loading text="saving..." />;
  } else {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
        behavior="padding"
        keyboardVerticalOffset={150}
      >
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>
              What is the title of your new deck ?
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Deck Title"
              placeholderTextColor={Colors.grey}
              onSubmitEditing={onSubmitPage}
              onChangeText={value => {
                setDeckTitle(value);
              }}
            />
            <TouchableHighlight style={styles.button} onPress={onSubmitPage}>
              <Text style={{ color: Colors.white, fontSize: 20 }}>Submit</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
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
