import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import React, { useState, useRef, useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function SearchScreen({navigation}) {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
