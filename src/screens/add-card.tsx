import React, { useState } from "react";
import { View, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { INavigationProp } from "../models/props.model";
import KeyboardView from "../hoc/keyboard-view";
import MyInput from "../components/UI/my-input";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Text } from "react-native-elements";
import { Colors } from "../utils/color";
import { useStateValue } from "../contexts/state-context";
import { useAppValue } from "../contexts/app-context";

type Props = {} & INavigationProp;

const AddCard = (props: Props) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const { deckAction } = useStateValue();
  const { appAction } = useAppValue();

  const { deckId } = props.navigation.state.params;

  const onSubmitPage = () => {
    console.log("onSubmitPage");

    if (question !== "" && answer !== "") {
      appAction.showLoading("saving...");
      deckAction
        .addCard(deckId, question, answer)
        .then(_ => {
          appAction.hideLoading();
          setQuestion("");
          setAnswer("");
          props.navigation.pop();
        })
        .catch(_ => {
          appAction.hideLoading();
        });
    }
  };

  return (
    <KeyboardView>
      <View style={styles.container}>
        <MyInput
          labelText="question"
          placeHolder="question"
          onValueChanged={value => setQuestion(value)}
          value={question}
        />
        <MyInput
          labelText="answer"
          placeHolder="answer"
          onValueChanged={value => setAnswer(value)}
          value={answer}
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
  input: TextStyle;
  button: ViewStyle;
}>({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20
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

export default AddCard;
