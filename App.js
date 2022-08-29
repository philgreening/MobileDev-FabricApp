import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import React, { useState, useRef, useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Octicons } from '@expo/vector-icons';


// Import screens
import HomeScreen from './screens/HomeScreen';
import AddItemScreen from './screens/AddItemScreen';
import SearchScreen from './screens/SearchScreen';
import DetailsScreen from './screens/DetailsScreen';
import EditScreen from './screens/EditScreen';
import CameraScreen from './screens/CameraScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
                tabBarIcon: ({size, color}) => (<Octicons name="home" size={24} color="black" />)
            }}
        />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
                tabBarIcon: ({size, color}) => (<Octicons name="search" size={24} color="black" />)
            }}
         />
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
        <Stack.Screen name="Edit fabric" component={EditScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
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
