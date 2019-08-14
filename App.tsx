import React from "react";
import { View, StatusBar } from "react-native";

import Constants from "expo-constants";
import Loading from "./src/hoc/loading";
import StateContextProvider from "./src/contexts/state-context";
import AppContextProvider from "./src/contexts/app-context";
import { Colors } from "./src/utils/color";
import { NotificationHelper } from "./src/utils/helper";
import StackNav from "./src/navigators/stack-nav";

const App = () => {
  console.log("[App]: init");

  NotificationHelper.setLocalNotification();

  return (
    <AppContextProvider>
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
          <Loading>
            <StackNav />
          </Loading>
        </View>
      </StateContextProvider>
    </AppContextProvider>
  );
};

export default App;
