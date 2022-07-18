import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import React, { useState, useRef, useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SQLite from 'expo-sqlite';

import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function SearchScreen({navigation}) {
  return (
    <SafeAreaView styles={styles.container}>
      <Text> Search screen </Text>
      <ScrollView>
        <TableView>
          <Section header='' hideSeparator={true} sectionTintColor={'#ccc'}>
            <Text> Fabric one </Text>
            <Text> Fabric two </Text>
          </Section>
        </TableView>
      </ScrollView>
    </SafeAreaView>
  )
}

function AddItemScreen({navigation}) {
  return (
    <SafeAreaView styles={styles.container}>
      <View>
        <TextInput
          placeholder="Enter fabric name"
        />
      </View>
    </SafeAreaView>
  )
}

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
