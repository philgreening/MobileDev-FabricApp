
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button, TextInput, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import React, { useState, useRef, useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import * as SQLite from 'expo-sqlite';
//
// const db = SQLite.openDatabase('fabricDB.db')

export default function DetailsScreen({navigation, route}) {

  const fabArray = route.params.i;

    React.useLayoutEffect(() => {
     navigation.setOptions({
       headerRight: () => (
         <Button
         title="Delete fabric"
         onPress={() => deleteAlert()}
         />
       ),
     });
   });

 // ALert to confirm delete
const deleteAlert = () =>
  Alert.alert(
    "Delete Fabric",
    `Do you wish to remove ${fabArray.name} ?`,
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK",
        onPress: () => {deleteFabric(fabArray.id),
                        navigation.navigate('Home', { name: fabArray.name} ) }
    }]
  );

  // Deletes item from database
   const deleteFabric = (item) => {
     db.transaction((txn) => {
       txn.executeSql(`DELETE FROM fabrics WHERE id = ?`, [item])
     })

   };

  return (
    <SafeAreaView styles={styles.container}>
      <Text> Search screen </Text>
      <ScrollView>
        <TableView>
          <Section header='' hideSeparator={true} sectionTintColor={'#ccc'}>
            <Text> {fabArray.id} </Text>
            <Text> {fabArray.name} </Text>
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
