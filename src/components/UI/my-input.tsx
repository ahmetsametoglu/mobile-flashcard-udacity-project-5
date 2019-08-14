import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import { Colors } from "../../utils/color";

type Props = {
  placeHolder: string;
  onValueChanged: Function;
  value: string;
  labelText: string;
  iconName?: string;
};
const MyInput = (props: Props) => {
  return (
    <Input
      value={props.value}
      onChangeText={value => {
        props.onValueChanged(value);
      }}
      label={props.labelText}
      placeholder={props.placeHolder}
      errorStyle={{ color: "red" }}
      leftIconContainerStyle={{ margin: 10 }}
      leftIcon={
        !!props.iconName ? (
          <Icon name={props.iconName} size={24} color={Colors.primaryColor} />
        ) : null
      }
    />
  );
};

export default MyInput;
