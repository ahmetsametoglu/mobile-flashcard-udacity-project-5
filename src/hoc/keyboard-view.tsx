import React, { ReactChild } from "react";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

type Props = { children: ReactChild };

const KeyboardView = (props: Props) => {
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
