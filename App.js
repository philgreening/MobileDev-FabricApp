import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Octicons } from "@expo/vector-icons";
import { screenHeight, db, iconSize } from "./modules/globalVariables.js";

import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

// Import screens
import HomeScreen from "./screens/HomeScreen";
import AddItemScreen from "./screens/AddItemScreen";
import SearchScreen from "./screens/SearchScreen";
import DetailsScreen from "./screens/DetailsScreen";
import EditScreen from "./screens/EditScreen";
import CameraScreen from "./screens/CameraScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//function to create tabs
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00637f",
        },
        headerTintColor: "#e4c2ca",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          height: screenHeight / 12,
          backgroundColor: "#e4c2ca",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Octicons name="home" size={iconSize} color="#00637f" />
          ),unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Octicons name="search" size={iconSize} color="#00637f" />
          ),unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  //   const [fontsLoaded] = useFonts({
  //    'Karla-Regular': require('./assets/fonts/Karla-Regular.ttf'),
  //    'Reikna-Regular': require('./assets/fonts/Reikna-Regular.otf'),
  //  });
  //
  //  useEffect(() => {
  //   async function prepare() {
  //     await SplashScreen.preventAutoHideAsync();
  //   }
  //
  //   prepare();
  // }, []);
  //
  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);
  //
  // if (!fontsLoaded) {
  //   return null;
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#00637f",
          },
          headerTintColor: "#e4c2ca",
          headerTitleStyle: {
            fontWeight: "bold",
            //fontFamily: 'Reikna-Regular'
          },
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
  );
}
