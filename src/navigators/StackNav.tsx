import { createAppContainer, createStackNavigator } from "react-navigation";
import TabNav from "./TabNav";
import Decks from "../screens/Decks";

const StackNav = createStackNavigator({
  home: {
    screen: TabNav,
    navigationOptions: {
      header: null
    }
  }
});

export default createAppContainer(StackNav);
