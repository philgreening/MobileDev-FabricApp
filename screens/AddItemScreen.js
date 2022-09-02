import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Switch,
// Dimensions
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import React, { useState, useRef, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Camera } from "expo-camera";
import SwitchSelector from "react-native-switch-selector";
import {Picker} from '@react-native-picker/picker';
import NumericInput from 'react-native-numeric-input'
import DateTimePicker from '@react-native-community/datetimepicker';
import { screenHeight, screenWidth, db } from '../modules/globalVariables.js';
import { Feather } from '@expo/vector-icons';

import { addEditStyles } from '../styles/addEditStyles';
import { textStyles } from '../styles/textStyles';

export default function AddItemScreen({ navigation, route }) {
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  // const [dateString, setDateString] = useState(date.toJSON());

  // const [fabName, setFabName] = useState("");
  const [fabricObj, setFabricObj] = useState({
    name: "",
    image_uri: "null",
    colour: "",
    woven_knit: 0,
    type: "Cotton",
    width: 0,
    length_pur: 0,
    length_rem: 0,
    date_pur: date.toDateString(),
    cost: 0,
    project: "",
  });
  // const [imageUri, setImageUri] = useState("null");
  console.log("fabricObject: ", fabricObj);

  const switchOptions = [
    { label: "Woven", value: 0 },
    { label: "Knit", value: 1 },
  ]

  useEffect(() => {
    if (route.params?.photoUri) {
      console.log("succes: ", route);
      setFabricObj({
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
//      setFabricObj({image_uri: route.params.photoUri,
       });
    }
  }, [route.params?.photoUri]);
  console.log("imageUri: ", fabricObj.image_uri);

  const addFabric = (item) => {
    db.transaction((txn) => {
      txn.executeSql(
        "INSERT INTO fabrics (name, image_uri, colour, woven_knit, type, width, length_pur , length_rem, date_pur, cost, project ) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
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
        ]
      );
    });
  };

  const onDateSelected = (event, value) => {
    if (Platform.OS === 'android') {
      setDatePicker(false);
    }
   // setDateString(value.toJSON());
    // setDate(new Date(dateString));
    setDate(value);
    setFabricObj({...fabricObj, date_pur: value.toJSON()})

    //console.log(fabricObj.date_pur);
 };

 const showDatePicker = () => {
   setDatePicker(true);
 };

 const numericInputProps = {
   minValue: 0,
   totalWidth:screenWidth/3,
   totalHeight:screenHeight/15,
   step:0.5,
   valueType:'real',
   textColor:'#00637f',
   iconStyle:{ color: 'white' },
   rightButtonBackgroundColor:'#e4c2ca',
   leftButtonBackgroundColor:'#e4c2ca'
 };

  return (

    <SafeAreaView style={addEditStyles.container}>
    <ScrollView style={addEditStyles.scrollContainer}>

      <View style={addEditStyles.imageContainer}>
        <Image
          style={addEditStyles.imageThumb}
          source={{
            uri: fabricObj.image_uri,
          }}
        />
        <TouchableOpacity
          style={addEditStyles.takePictureButton}
          onPress={() => {
            navigation.navigate("Camera", { data: fabricObj} );
          }}
        >
        <Feather name="camera" size={36} color="#00637f" />
        </TouchableOpacity>
      </View>

        <View style={addEditStyles.row}>
        <Text style={[addEditStyles.label, textStyles.text ]}> Name:  </Text>
          <TextInput
            style={[ addEditStyles.inputBar ]}
            placeholder="Enter fabric name"
            placeholderTextColor = '#00637f'
            color = '#00637f'
            onChangeText={(value) => setFabricObj({ ...fabricObj, name: value })}
            value={fabricObj.name}
          />
        </View>

        <View style={addEditStyles.row}>
        <Text style={[addEditStyles.label, textStyles.text ]}> Colour:  </Text>
          <TextInput
            style={addEditStyles.inputBar}
            placeholder="Enter fabric colour"
            placeholderTextColor = '#00637f'
            color = '#00637f'
            onChangeText={(value) => setFabricObj({ ...fabricObj, colour: value })}
            value={fabricObj.colour}
          />
          </View>

          <SwitchSelector
            style={addEditStyles.switch}
            textColor={'#00637f'}
            selectedColor={'#fff'}
            buttonColor={'#e4c2ca'}
            borderColor={'#e4c2ca'}
            fontSize={screenWidth * 0.04}
            hasPadding
            bold={true}
            options={switchOptions}
            initial = {0}
            value = {0}
            onPress={value => setFabricObj({...fabricObj, woven_knit: value})}
          >
          </SwitchSelector>

          <View style={addEditStyles.row}>
            <Text style={[addEditStyles.label, textStyles.text ]}> Fabric type: </Text>
            <Picker
              selectedValue={fabricObj.type}
              style={addEditStyles.picker}
              onValueChange={(value, itemIndex) =>
              setFabricObj({ ...fabricObj, type: value })
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

        <View style={addEditStyles.row}>
          <Text style={[addEditStyles.label, textStyles.text ]}>Fabric Width (in m): </Text>
          <NumericInput
          {...numericInputProps}
          value={fabricObj.width}
          onChange={value => setFabricObj({...fabricObj, width: value})}
          rounded
          />
        </View>

        <View style={addEditStyles.row}>
          <Text style={[addEditStyles.label, textStyles.text ]}>Length Purchased (in m): </Text>
          <NumericInput
          {...numericInputProps}
          value={fabricObj.length_pur}
          onChange={value => setFabricObj({...fabricObj, length_pur: value})}
          rounded
          />
        </View>

        <View style={addEditStyles.row}>
          <Text style={[addEditStyles.label, textStyles.text ]}>Length Remaining (in m): </Text>
          <NumericInput
            {...numericInputProps}
            value={fabricObj.length_rem}
            onChange={value => setFabricObj({...fabricObj, length_rem: value})}
            maxValue={fabricObj.length_pur}
            rounded
            />
        </View>

        <View style={addEditStyles.row}>
          <Text style={[addEditStyles.label, textStyles.text ]}>Date Purchased:{"\n"}{date.toDateString()}</Text>
          {!datePicker && (
                        <TouchableOpacity
                           style={addEditStyles.datePicker}
                           onPress={showDatePicker}>
                          <Feather name="calendar" size={36} color="#00637f" />
                        </TouchableOpacity>
          )}

          {datePicker && (
          <DateTimePicker value={date} onChange={onDateSelected} style={{ flex:1, backgroundColor: "white"}}/>
          )}
        </View>

        <View style={addEditStyles.row}>
          <Text style={[addEditStyles.label, textStyles.text ]}>Cost (in £): </Text>
          <NumericInput
            {...numericInputProps}
            value={fabricObj.cost}
            onChange={value => setFabricObj({...fabricObj, cost: value})}
            rounded
            />
        </View>

        <View style={addEditStyles.row}>
        <Text style={[addEditStyles.label, textStyles.text ]}>Planned projects: </Text>
          <TextInput
            style={addEditStyles.inputBar}
            placeholder="Enter project ideas"
            placeholderTextColor = '#00637f'
            color = '#00637f'
            onChangeText={(value) => setFabricObj({ ...fabricObj, project: value })}
            value={fabricObj.project}
          />
          </View>
          </ScrollView>

          <TouchableOpacity
            style = {addEditStyles.submitButton}
            onPress={() => {
              addFabric(fabricObj),
                navigation.navigate("Home", { name: fabricObj.name });
            }}>
            <Text style={addEditStyles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
  }
});
