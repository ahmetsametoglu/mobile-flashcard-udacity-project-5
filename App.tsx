import React from "react";
import { View, StatusBar } from "react-native";
import StackNav from "./src/navigators/StackNav";

import Constants from "expo-constants";
import { Colors } from "./src/utils/color";

const App = () => {
  return (
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
  );
};

export default App;
