import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import React, { useState, useRef, useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import screens
import HomeScreen from './screens/HomeScreen';
import AddItemScreen from './screens/AddItemScreen';
import SearchScreen from './screens/SearchScreen';
import DetailsScreen from './screens/DetailsScreen';

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('fabricDB.db')
global.db = db



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
}

export default function App() {

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Add fabric" component={AddItemScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
