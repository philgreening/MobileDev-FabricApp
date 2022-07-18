import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import React, { useState, useRef, useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase(
    {
      name: 'fabricDB',
      location: 'default',
    },
    () => { },
    error => { console.log(error) }
);

export default function HomeScreen({navigation}) {
  React.useLayoutEffect(() => {
   navigation.setOptions({
     headerRight: () => (
       <Button
       title="Add fabric"
       onPress={() => navigation.navigate('Add fabric')}
       />
     ),
   });
 });

 const [name, setName] = useState('');

 useEffect(() => {
   createTable();
   setData();
   getData();
 }, []);

 const createTable = () => {
   db.transaction((tx)=> {
     tx.executeSql(
       "CREATE TABLE IF NOT EXISTS "
       + "Fabrics "
       + "(Id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT);",
       []
     )
   })
 };

 const setData = async () => {
   await db.transaction(async (tx) => {
     await tx.executeSql(
       "INSERT INTO Fabrics (Name) VALUES ('New fabric')"
       ,  console.log("Set Data Called")
     )
   })
 };

 const getData = () => {
   try {
     db.transaction((tx) => {
       tx.executeSql(
         "SELECT * FROM Fabrics",
         [],
         (_, { rows: {_array } }) => setName(_array),
         () => console.log("called")
      )
     });
   } catch (error) {
     console.log(error);
   }
 };

  return (
    <SafeAreaView styles={styles.container}>
      <ScrollView>
        <TableView>
          <Section header='' hideSeparator={true} sectionTintColor={'#ccc'}>
            <Text> Fabric one </Text>
            <Text> {name} </Text>
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
