import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { screenHeight, db, iconSize } from "./modules/globalVariables.js";
import * as SplashScreen from "expo-splash-screen";
import * as Font from 'expo-font';
import Toast from 'react-native-toast-message';

// Import screens
import HomeScreen from "./screens/HomeScreen";
import AddItemScreen from "./screens/AddItemScreen";
import SearchScreen from "./screens/SearchScreen";
import DetailsScreen from "./screens/DetailsScreen";
import EditScreen from "./screens/EditScreen";
import CameraScreen from "./screens/CameraScreen";
// Import icons and StyleSheets
import { Octicons } from "@expo/vector-icons";
import { textStyles } from "./styles/textStyles";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

//function to create tabs
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00637f",
          height: screenHeight / 10
        },
        headerTintColor: "#e4c2ca",
        headerTitleStyle: {
          fontSize:textStyles.headerText.fontSize,
          fontFamily:textStyles.headerText.fontFamily
        },
        headerBackTitleVisible: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: screenHeight / 10,
          backgroundColor: "#e4c2ca",
          },
      }}
    >
      <Tab.Screen
        name="Fabric Stash"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Octicons
              name="home"
              size={28}
              color="#00637f"
            />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Octicons
              name="search"
              size={28}
              color="#00637f"
            />
          ),
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);
  // load fonts and diplay spash screen
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts
        await Font.loadAsync({
          "Karla-Regular": require("./assets/fonts/Karla-Regular.ttf"),
          "Reikna-Regular": require("./assets/fonts/Reikna-Regular.otf"),
         })
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <>
    <NavigationContainer >
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#00637f",
            height: screenHeight / 10,
          },
          headerTintColor: "#e4c2ca",
          headerTitleStyle: {
            fontSize:textStyles.headerText.fontSize,
            fontFamily:textStyles.headerText.fontFamily
          },
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name="Tabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Add fabric" component={AddItemScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Edit fabric" component={EditScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    <Toast/>
    </>
  );
}
