import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import React, { useState, useRef, useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as SQLite from 'expo-sqlite';

import HomeScreen from './HomeScreen';
// import * as FB from '../modules/getData';


const db = SQLite.openDatabase('fabricDB.db')

// const gtf = Home.getFabric();

export default function AddItemScreen({navigation}) {
  const [fabName, setFabName] = useState('');

  const addFabric = (item) => {
    db.transaction((txn) => {
      txn.executeSql('INSERT INTO fabrics (name) VALUES (?)', [item])
    })

  };

  //
  // const getFabric = () => {
  //   db.transaction((txn) => {
  //     txn.executeSql('SELECT * FROM `fabrics`', [], (tx, res) => {
  //       for (let i = 0; i < res.rows.length; ++i) {
  //         console.log('Fabric: ', res.rows.item(i))
  //       }
  //     })
  //   })
  // };


  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput style={styles.inputBar}
          placeholder="Enter fabric name"
          onChangeText={ setFabName }
          value={fabName}

        />
        <Text> {fabName} </Text>
      </View>
      <Button
        title='Add Fabric'
        onPress={()=>{addFabric(fabName), navigation.navigate('Home', { name: fabName } )}}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '5%',
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  inputBar: {
    borderWidth: 2,
    borderColor: 'black',
    margin: '5%',
    padding: '3%'
  }
});
