import React from "react";
import { View, StatusBar } from "react-native";
import StackNav from "./src/navigators/StackNav";

import Constants from "expo-constants";
import { Colors } from "./src/utils/color";
import StateContextProvider from "./src/contexts/StateContext";

const App = () => {
  console.log("[App]: init");

  return (
    <StateContextProvider>
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: Colors.thirdColor,
            height: Constants.statusBarHeight
          }}
        >
          <StatusBar
            translucent
            backgroundColor={Colors.thirdColor}
            barStyle="light-content"
          />
        </View>
        <StackNav />
      </View>
    </StateContextProvider>
  );
};

export default App;
