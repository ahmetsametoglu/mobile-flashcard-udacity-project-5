import React, { FC } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Colors } from "../utils/color";

interface IProp {
  text?: string;
}

const Loading: FC<IProp> = props => {
  return (
    <View style={{ flex: 1, marginTop: 50, alignItems: "center" }}>
      <ActivityIndicator size={50} color={Colors.primaryColor} />
      {!!props.text && (
        <Text style={{ fontSize: 20, color: Colors.darkgoldenrod }}>
          {props.text}
        </Text>
      )}
    </View>
  );
};

export default Loading;
