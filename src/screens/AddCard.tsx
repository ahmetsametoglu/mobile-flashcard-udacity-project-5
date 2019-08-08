import React, { FC } from "react";
import { View, Text } from "react-native";
import { INavigationProp } from "../models/props.model";

interface IProps extends INavigationProp {}

const AddCard: FC<IProps> = () => {
  return (
    <View>
      <Text>Add Card</Text>
    </View>
  );
};

export default AddCard;
