// Import React Navigation
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

import tabBarIcon from "./utils/tabBarIcon";
// Import the screens
import FeedScreen from "./screens/FeedScreen";
import Profile from "./screens/Profile";
import NewPostScreen from "./screens/NewPostScreen";
import SelectPhotoScreen from "./screens/SelectPhotoScreen";
import FirstScreen from "./screens/FirstScreen";

// Create our main tab navigator for moving between the Feed and Photo screens
const navigator = createBottomTabNavigator(
  {
    // The name `Feed` is used later for accessing screens

    Feed: {
      // Define the component we will use for the Feed screen.
      screen: FeedScreen,
      navigationOptions: {
        // Add a cool Material Icon for this screen
        tabBarIcon: tabBarIcon("home")
      }
    },
    Profile: {
      // Define the component we will use for the Feed screen.
      screen: Profile,
      navigationOptions: {
        // Add a cool Material Icon for this screen
        tabBarIcon: tabBarIcon("person")
      }
    },
    // All the same stuff but for the Photo screen
    Photo: {
      screen: SelectPhotoScreen,
      navigationOptions: {
        tabBarIcon: tabBarIcon("add-circle")
      }
    }
  },
  {
    // We want to hide the labels and set a nice 2-tone tint system for our tabs
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "black",
      inactiveTintColor: "gray"
    }
  }
);

// Create the navigator that pushes high-level screens like the `NewPost` screen.

const sNavigator = createStackNavigator(
  {
    Main: {
      screen: navigator,
      // Set the title for our app when the tab bar screen is present
      navigationOptions: { title: "Campus" }
    },
    // This screen will not have a tab bar
    NewPost: NewPostScreen
  },
  {
    cardStyle: { backgroundColor: "white" }
  }
);

const swNavigator = createSwitchNavigator(
  {
    Rt: {
      screen: FirstScreen,

      navigationOptions: {
        header: null
      }
    },
    Main: sNavigator
  },
  {
    initialRouteName: "Rt"
  },
  {
    cardStyle: { backgroundColor: "white" }
  }
);

const AppContainer = createAppContainer(swNavigator);

// Export it as the root component
export default AppContainer;
