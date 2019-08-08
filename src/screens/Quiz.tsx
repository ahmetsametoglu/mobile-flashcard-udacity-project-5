import React, { FC } from "react";
import { View, Text } from "react-native";
import { INavigationProp } from "../models/props.model";

interface IProps extends INavigationProp {}
const Quiz: FC<IProps> = () => {
  return (
    <View>
      <Text>Quiz</Text>
    </View>
  );
};

export default Quiz;
