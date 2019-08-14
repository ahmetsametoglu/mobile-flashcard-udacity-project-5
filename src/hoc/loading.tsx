import React, { FC, Fragment } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Colors } from "../utils/color";
import { useAppValue } from "../contexts/app-context";

interface IProp {}

const Loading: FC<IProp> = props => {
  const { state } = useAppValue();

  if (!state.showLoading) {
    return <Fragment>{props.children}</Fragment>;
  } else {
    return (
      <Fragment>
        {props.children}
        <View
          style={{
            zIndex: 50,
            position: "absolute",
            flex: 1,
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.loadingBackRoundColor
          }}
        >
          <ActivityIndicator size={50} color={Colors.primaryColor} />
          {!!state.loadingText && (
            <Text style={{ fontSize: 20, color: Colors.red, marginTop: 10 }}>
              {state.loadingText}
            </Text>
          )}
        </View>
      </Fragment>
    );
  }
};

export default Loading;
