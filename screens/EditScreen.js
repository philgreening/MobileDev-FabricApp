
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button, TextInput, Alert, Image, Dimensions, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import React, { useState, useRef, useEffect, useCallback} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SwitchSelector from "react-native-switch-selector";
import {Picker} from '@react-native-picker/picker';
import NumericInput from 'react-native-numeric-input'
import DateTimePicker from '@react-native-community/datetimepicker';

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('fabricDB.db')

const screen = Dimensions.get('window');
const screenHeight = screen.height;
const screenWidth = screen.width;

export default function EditScreen({navigation, route}) {


  const fabricObj = route.params.data;
  console.log('from route: ', fabricObj);

  const [editFabricObj, setEditFabricObj] = useState( fabricObj );
  console.log('edit fabric obj: ', editFabricObj);

  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date(editFabricObj.date_pur));
  const [dateString, setDateString] = useState(date.toJSON());

  useEffect(() => {
    if (route.params?.photoUri) {
      console.log("succes: ", route);
      setEditFabricObj(
        {
        id: route.params.data.id,
        name: route.params.data.name,
        image_uri: route.params.photoUri,
        colour: route.params.data.colour,
        woven_knit: route.params.data.woven_knit,
        type: route.params.data.type,
        width: route.params.data.width,
        length_pur: route.params.data.length_pur,
        length_rem: route.params.data.length_rem,
        date_pur: route.params.data.date_pur,
        cost: route.params.data.cost,
        project: route.params.data.project
      })
      //setEditFabricObj(route.params.data);
      //setEditFabricObj({image_uri: route.params.photoUri});
       // );
    }
  }, [route.params?.photoUri]);
  console.log("imageUri: ", fabricObj.image_uri);

  const switchOptions = [
    { label: "Woven", value: 0 },
    { label: "Knit", value: 1 },
  ]


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
    `Do you wish to remove ${editFabricObj.name} ?`,
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK",
        onPress: () => {deleteFabric(editFabricObj.id),
                        navigation.navigate('Home', { name: editFabricObj.name} ) }
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
     console.log('item:', item);
     db.transaction((txn) => {
       txn.executeSql("UPDATE fabrics SET name = ?, image_uri = ?, colour = ?, woven_knit = ?, type = ?, width = ?, length_pur = ?, length_rem = ?, date_pur = ?, cost = ?, project = ? WHERE id = ?",
        // [item.name, item.id])
        [
          item.name,
          item.image_uri,
          item.colour,
          item.woven_knit,
          item.type,
          item.width,
          item.length_pur,
          item.length_rem,
          item.date_pur,
          item.cost,
          item.project,
          item.id,
        ])
        console.log('id', item.id);
     })


   };

   const onDateSelected = (event, value) => {
     setDateString(value.toJSON());
     setEditFabricObj({...editFabricObj, date_pur: dateString})
     setDate(new Date(dateString));
     setDatePicker(false);
  };

  const showDatePicker = () => {
    setDatePicker(true);
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
  setEditFabricObj(editFabricObj => ({
      ...editFabricObj,
      [key]: value,
    }));
};

// setName(Prevname => [...Prevname, res.rows.item(i)])
  console.log(editFabricObj.image_uri);

  return (

    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollContainer}>

      <View style={styles.imageContainer}>
        <Image
          style={styles.imageThumb}
          source={{
            uri: editFabricObj.image_uri,
          }}
        />
        <TouchableOpacity
          style={styles.takePictureButton}
          onPress={() => {
            navigation.navigate("Camera", { data: editFabricObj} );
          }}
        >
          <Text style={styles.takePictureButtonText}>
            Take picture
          </Text>
        </TouchableOpacity>
      </View>

        <View style={styles.row}>
        <Text style={styles.label}> Name:  </Text>
          <TextInput
            style={styles.inputBar}
            placeholder="Enter fabric name"
            onChangeText={(value) => setEditFabricObj({ ...editFabricObj, name: value })}
            value={editFabricObj.name}
          />
          <Text> {editFabricObj.name} </Text>
        </View>

        <View style={styles.row}>
        <Text style={styles.label}> Colour:  </Text>
          <TextInput
            style={styles.inputBar}
            placeholder="Enter fabric colour"
            onChangeText={(value) => setEditFabricObj({ ...editFabricObj, colour: value })}
            value={editFabricObj.colour}
          />
          <Text> {editFabricObj.colour} </Text>
          </View>

          <SwitchSelector
            style={styles.switch}
            options={switchOptions}
            initial = {editFabricObj.woven_knit}
            value = {editFabricObj.woven_knit}
            onPress={value => setEditFabricObj({...editFabricObj, woven_knit: value})}
          >
          </SwitchSelector>

          <View style={styles.row}>
            <Text style={styles.label} > Fabric type: </Text>
            <Picker
              selectedValue={editFabricObj.type}
              style={styles.picker}
              onValueChange={(value, itemIndex) =>
              setEditFabricObj({ ...editFabricObj, type: value })
              }>
              <Picker.Item label="Cotton" value="Cotton" />
              <Picker.Item label="Wool" value="Wool" />
              <Picker.Item label="Linen" value="Linen" />
              <Picker.Item label="Jersey" value="Jersey" />
              <Picker.Item label="Synthetic" value="Synthetic" />
              <Picker.Item label="Swim Suiting" value="Swim Suiting" />
              <Picker.Item label="Lycra" value="Lycra" />
              <Picker.Item label="Denim" value="Denim" />
            </Picker>
          </View>

        <View style={styles.row}>
          <Text style={styles.label}>Fabric Width (in m): </Text>
          <NumericInput
          value={editFabricObj.width}
          onChange={value => setEditFabricObj({...editFabricObj, width: value})}
          minValue={0}
          totalWidth={screenWidth/3}
          totalHeight={screenHeight/15}
          step={0.5}
          valueType='real'
          rounded
          textColor='#B0228C'
          iconStyle={{ color: 'white' }}
          rightButtonBackgroundColor='#EA3788'
          leftButtonBackgroundColor='#E56B70'/>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Length Purchased (in m): </Text>
          <NumericInput
          value={editFabricObj.length_pur}
          onChange={value => setEditFabricObj({...editFabricObj, length_pur: value})}
          minValue={0}
          totalWidth={screenWidth/3}
          totalHeight={screenHeight/15}
          step={0.5}
          valueType='real'
          rounded
          textColor='#B0228C'
          iconStyle={{ color: 'white' }}
          rightButtonBackgroundColor='#EA3788'
          leftButtonBackgroundColor='#E56B70'/>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Length Remaining (in m): </Text>
          <NumericInput
          value={editFabricObj.length_rem}
          onChange={value => setEditFabricObj({...editFabricObj, length_rem: value})}
          minValue={0}
          maxValue={editFabricObj.length_pur}
          totalWidth={screenWidth/3}
          totalHeight={screenHeight/15}
          step={0.5}
          valueType='real'
          rounded
          textColor='#B0228C'
          iconStyle={{ color: 'white' }}
          rightButtonBackgroundColor='#EA3788'
          leftButtonBackgroundColor='#E56B70'/>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Date Purchased:{"\n"}{date.toDateString()}</Text>
             <Button
                title="Show Date Picker"
                color="green" onPress={showDatePicker} />
          {datePicker && (
          <DateTimePicker
            value={date}
            onChange={onDateSelected}
             />
          )}
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Cost (in £): </Text>
          <NumericInput
          value={editFabricObj.cost}
          onChange={value => setEditFabricObj({...editFabricObj, cost: value})}
          minValue={0}
          totalWidth={screenWidth/3}
          totalHeight={screenHeight/15}
          step={0.5}
          valueType='real'
          rounded
          textColor='#B0228C'
          iconStyle={{ color: 'white' }}
          rightButtonBackgroundColor='#EA3788'
          leftButtonBackgroundColor='#E56B70'/>
        </View>

        <View style={styles.row}>
        <Text style={styles.label}>Project ideas: </Text>
          <TextInput
            style={styles.inputBar}
            placeholder="Enter project ideas"
            onChangeText={(value) => setEditFabricObj({ ...editFabricObj, project: value })}
            value={editFabricObj.project}
          />
          <Text> {editFabricObj.project} </Text>
          </View>
          </ScrollView>

          <Button
            title="Edit Fabric"
            onPress={() => {
              updateFabric(editFabricObj),
                navigation.navigate("Home", { name: editFabricObj.name });
            }}
          />
        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // inputBar: {
  //   borderWidth: 2,
  //   borderColor: 'black',
  //   margin: '5%',
  //   padding: '3%'
  // }
  container: {
    flex: 1,
  //  padding: '5%',
    // flexDirection: 'row',
    backgroundColor: "#fff",
    //alignItems: 'center',
  },
  scrollContainer :{
    flex: 1,
    padding: '5%'
  },
  imageContainer:{
    //flex: 0.25,
    height: screenHeight/5,
    flexDirection: 'row',
    marginBottom: '10%',
  //  padding: '5%'

  //  flexWrap: 'wrap',
  },
  inputBar: {
    // width: '100%',
    flex: 4,
    borderWidth: 2,
    borderColor: "black",
    padding: "1%"
  },
  imageThumb: {
    flex: 3,
    //width: '80%',
    //height: '20%',
    borderRadius: 4,
    marginRight: '3%',
  },
  takePictureButton: {
    //width: 130,
    flex: 1,
    borderRadius: 4,
    backgroundColor: "#14274e",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: '3%',
    //height: 40,
  },
  takePictureButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: '10%',
    alignItems: "center",
    //justifyContent: 'center'
  },
  label: {
    flex: 1,
  },
  switch: {
    flex: 1,
    marginBottom: '5%'
  },
  picker: {
    flex: 2,
  }
});
