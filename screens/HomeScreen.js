import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import React, { useState, useRef, useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('fabricDB.db')

//https://openbase.com/js/react-native-sqlite-2/documentation
db.transaction((txn) => {
  txn.executeSql('DROP TABLE IF EXISTS fabrics', [])
  txn.executeSql(
    'CREATE TABLE IF NOT EXISTS fabrics(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30))',
    []
  )
})

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
   addFabric();
   getFabric();
 }, []);

const addFabric = () => {
  db.transaction((txn) => {
    txn.executeSql('INSERT INTO fabrics (name) VALUES (?)', ['fab1'])
    txn.executeSql('INSERT INTO fabrics (name) VALUES (?)', ['fab2'])
  })
};

const getFabric = () => {
  db.transaction((txn) => {
    txn.executeSql('SELECT * FROM `fabrics`', [], (tx, res) => {
      for (let i = 0; i < res.rows.length; ++i) {
        setName(res.rows.item(0).name)
        console.log('Fabric: ', res.rows.item(i))
      }
    })
  })
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
