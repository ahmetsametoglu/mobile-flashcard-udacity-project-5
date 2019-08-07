import { createAppContainer, createStackNavigator } from "react-navigation";
import TabNav from "./TabNav";
import DeckMenu from "../screens/DeckMenu";
import { Colors } from "../utils/color";

const StackNav = createStackNavigator(
  {
    Home: {
      screen: TabNav,
      navigationOptions: {
        header: null
      }
    },
    DeckMenu: {
      screen: DeckMenu,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.title}`
      })
    }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: Colors.primaryColor,
      headerStyle: {
        height: 40,
        backgroundColor: Colors.white,
        borderBottomColor: Colors.secondaryColor
      },
      headerBackTitle: null
    }
  }
);

export default createAppContainer(StackNav);
