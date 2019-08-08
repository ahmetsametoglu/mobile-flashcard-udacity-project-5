import { createAppContainer, createStackNavigator } from "react-navigation";
import TabNav from "./TabNav";
import DeckMenu from "../screens/DeckMenu";
import { Colors } from "../utils/color";
import Quiz from "../screens/Quiz";
import AddCard from "../screens/AddCard";

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
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: ({ navigation }) => ({
        title: `Add Card`
      })
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.title}`
      })
    }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: Colors.white,
      headerStyle: {
        height: 40,
        backgroundColor: Colors.black,
        borderBottomColor: Colors.secondaryColor
      },
      headerBackTitle: null
    }
  }
);

export default createAppContainer(StackNav);
