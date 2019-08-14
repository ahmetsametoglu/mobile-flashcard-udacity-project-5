import React, { FC } from "react";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const KeyboardView: FC = props => {
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center"
      }}
      behavior="padding"
      keyboardVerticalOffset={150}
    >
      <ScrollView style={{ flex: 1 }}>{props.children}</ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardView;
