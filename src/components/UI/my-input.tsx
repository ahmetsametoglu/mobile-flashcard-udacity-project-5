import React, { FC } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import { Colors } from "../../utils/color";

type IProps = {
  placeHolder: string;
  onValueChanged: Function;
  value: string;
  labelText: string;
  iconName?: string;
};
const MyInput: FC<IProps> = props => {
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
