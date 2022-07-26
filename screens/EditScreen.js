
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button, TextInput, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import React, { useState, useRef, useEffect, useCallback} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('fabricDB.db')

export default function EditScreen({navigation, route}) {


  const fabArray = route.params.data;
  console.log(fabArray);

  const [editFabArray, setEditFabArray] = useState( fabArray );
  console.log(editFabArray);

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
    }
  ],
  { cancelable: false }
  );

  // Deletes item from database
   const deleteFabric = (item) => {
     db.transaction((txn) => {
       txn.executeSql(`DELETE FROM fabrics WHERE id = ?`, [item])
     })

   };

   const updateFabric = (item) => {
     db.transaction((txn) => {
       txn.executeSql(`UPDATE fabrics SET name = ? WHERE id = ?`, [item.name, item.id])
     })

   };

//   const updateFieldChanged = index => e => {
//     console.log('index: ' + index);
//     console.log('property name: '+ e);
//     let newArr = [...editFabArray]; // copying the old datas array
//     consle.log(newArr);
//     //newArr[index] = e.target.value; // replace e.target.value with whatever you want to change it to
//
//     // setEditFabArray(newArr);
// }

const handleOnChange = (key, value) => {
  // const { name, value } = event.target;
  console.log("key: " +  key + " value: " +  value);
  // setInputValues({ ...inputValues, [name]: value });
  setEditFabArray(editFabArray => ({
      ...editFabArray,
      [key]: value,
    }));
};

// setName(Prevname => [...Prevname, res.rows.item(i)])


  return (
    <SafeAreaView styles={styles.container}>
      <Text> Search screen </Text>
      <ScrollView>
        <TableView>
          <Section header='' hideSeparator={true} sectionTintColor={'#ccc'}>
            <Text> {fabArray.id} </Text>
            <Text> {fabArray.name} </Text>
            <Text> {editFabArray.name} </Text>
            <TextInput style={styles.inputBar}
              onChangeText={(text) => handleOnChange('name', text)}
              value={editFabArray.name}
            />

          </Section>
        </TableView>
        <Button
          title='Submit'
          onPress={()=>{updateFabric(editFabArray), navigation.navigate('Home', { editFabArray } )}}
        />
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
  inputBar: {
    borderWidth: 2,
    borderColor: 'black',
    margin: '5%',
    padding: '3%'
  }
});
