import React from "react";
import { useMoralis } from "react-moralis";
import { useWalletConnect } from "./WalletConnect";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LogBox } from "react-native";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import CryptoAuth from "./Components/CryptoAuth";
import RecentTransactions from "./Components/RecentTransactions/RecentTransactions";
import Assets from "./Components/Assets/Assets";
import Transfer from "./Components/Transfer/Transfer";
import Profile from "./Components/Profile/Profile";
import Header from "./Components/Header";
import NFTAssets from "./Components/NFT/NFTAssets";

import Moralis from "moralis/types";

LogBox.ignoreAllLogs();

// const Activecolor =
function Home(): JSX.Element {
  return (
    <Tab.Navigator
      shifting={false}
      activeColor="#315399"
      // inactiveColor="#3e2465"
      barStyle={{ backgroundColor: "white" }}>
      <Tab.Screen
        name="Assets"
        options={{
          tabBarLabel: "Assets",
        }}
        component={Assets}
      />
      <Tab.Screen
        name="Transactions"
        options={{
          tabBarLabel: "Transactions",
        }}
        component={RecentTransactions}
      />
      <Tab.Screen
        name="NFTAssets"
        options={{
          tabBarLabel: "NFTAssets",
        }}
        component={NFTAssets}
      />
      <Tab.Screen
        name="Transfer"
        options={{
          tabBarLabel: "Transfer",
        }}
        component={Transfer}
      />

      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";

  switch (routeName) {
    case "Assets":
      return "Assets";
    case "Transfer":
      return "Transfer";
    case "Transactions":
      return "Transactions";
    case "Profile":
      return "Profile";
  }
}

function App(): JSX.Element {
  const connector = useWalletConnect();
  const {
    authenticate,
    authError,
    isAuthenticating,
    isAuthenticated,
    logout,
    Moralis,
  } = useMoralis();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Auth"
          component={CryptoAuth}
          options={{ headerShown: false }}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={Home}
          // Hiding header for Navigation Drawer
          options={{ headerTitle: (props) => <Header /> }}
          // options={({ route }) => ({
          //   headerTitle: getHeaderTitle(route),
          // })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
