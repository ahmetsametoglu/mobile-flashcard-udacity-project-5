import React, { FC } from "react";
import { Text, ViewStyle, TextStyle, StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Colors } from "../../utils/color";

interface IProp {
  buttonText: string;
  buttonColor: string;
  handleClick: Function;
}
const ActionButton: FC<IProp> = props => {
  const { buttonText, handleClick, buttonColor } = props;

  return (
    <TouchableHighlight
      underlayColor={Colors.primaryColor}
      onPress={() => handleClick()}
      style={[styles.button, { backgroundColor: buttonColor }]}
    >
      <Text style={styles.buttonText}>{buttonText}</Text>
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
    color: Colors.white,
    fontSize: 20,
    textAlign: "center"
  }
});

export default ActionButton;
