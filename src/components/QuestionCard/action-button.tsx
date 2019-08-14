import React from "react";
import { Text, ViewStyle, TextStyle, StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Colors } from "../../utils/color";

type Props = {
  buttonText: string;
  handleClick: Function;
  buttonColor?: string;
  textColor?: string;
};
const ActionButton = (props: Props) => {
  const {
    buttonText,
    handleClick,
    buttonColor = Colors.white,
    textColor = Colors.black
  } = props;

  return (
    <TouchableHighlight
      underlayColor={Colors.primaryColor}
      onPress={() => handleClick()}
      style={[styles.button, { backgroundColor: buttonColor }]}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>
        {buttonText}
      </Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create<{ button: ViewStyle; buttonText: TextStyle }>({
  button: {
    margin: 5,
    padding: 10,
    width: 160,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center"
  }
});

export default ActionButton;
