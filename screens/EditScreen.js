import { StatusBar } from "expo-status-bar";
import {
  Platform,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import SwitchSelector from "react-native-switch-selector";
import { Picker } from "@react-native-picker/picker";
import NumericInput from "react-native-numeric-input";
import DateTimePicker from "@react-native-community/datetimepicker";
import { screenHeight, screenWidth, db } from "../modules/globalVariables.js";
import { Feather } from "@expo/vector-icons";

import { addEditStyles } from "../styles/addEditStyles";
import { headerStyles } from "../styles/headerStyles";
import { textStyles } from "../styles/textStyles";

export default function EditScreen({ navigation, route }) {
  const fabricObj = route.params.data;
  console.log('from route: ', fabricObj);

  if (fabricObj.woven_knit === 'Knit') {
    fabricObj.woven_knit = 1;
  } else if (fabricObj.woven_knit === 'Woven') {
    fabricObj.woven_knit = 0;
    console.log('no');
  }

  const [editFabricObj, setEditFabricObj] = useState(fabricObj);
  console.log('edit fabric obj: ', editFabricObj);

  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date(editFabricObj.date_pur));
  // const [dateString, setDateString] = useState(date.toJSON());

  useEffect(() => {
    console.log(textStyles.icon.fontSize);
    if (route.params?.photoUri) {
      console.log('succes: ', route);
      setEditFabricObj({
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
        project: route.params.data.project,
      });
    }

    console.log('fabob: ', fabricObj);
  }, [route.params?.photoUri]);
  console.log('imageUri: ', fabricObj);

  const switchOptions = [
    { label: 'Woven', value: 0 },
    { label: 'Knit', value: 1 },
  ];

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => deleteAlert()}
          style={headerStyles.headerRight}
        >
          <Feather name='trash-2' size={textStyles.icon.fontSize} color='#e4c2ca' />
        </TouchableOpacity>
      ),
    });
  });

  // ALert to confirm delete
  const deleteAlert = () =>
    Alert.alert(
      'Delete Fabric',
      `Do you wish to remove ${editFabricObj.name} ?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            deleteFabric(editFabricObj.id),
              navigation.navigate('Home', { name: editFabricObj.name });
          },
        },
      ],
      { cancelable: false }
    );

  // Deletes item from database
  const deleteFabric = (item) => {
    db.transaction((txn) => {
      txn.executeSql(`DELETE FROM fabrics WHERE id = ?`, [item]);
    });
  };

  // Valudates that name and colour have input befor submit
  const textValidation = (param) => {
    if (param.name.length < 1 && param.colour.length < 1) {
      Alert.alert(
        'Name and Colour must not be empty',
        'Please enter a name and colour',
        [
          {
            text: 'Go back',
            style: 'Cancel',
          },
        ],
        { cancelable: true }
      );
    } else if (param.name.length < 1) {
      Alert.alert(
        'Name must not be empty',
        'Please enter a name',
        [
          {
            text: 'Go back',
            style: 'Cancel',
          },
        ],
        { cancelable: true }
      );
    } else if (param.colour.length < 1) {
      Alert.alert(
        'Colour must not be empty',
        'Please enter a colour',
        [
          {
            text: 'Go back',
            style: 'Cancel',
          },
        ],
        { cancelable: true }
      );
    } else {
      updateFabric(editFabricObj);
      navigation.navigate('Home', { data: editFabricObj });
    }
  };

  const updateFabric = (item) => {
    console.log('item:', item);
    db.transaction((txn) => {
      txn.executeSql(
        `UPDATE fabrics SET name = ?,
        image_uri = ?,
        colour = ?,
        woven_knit = ?,
        type = ?, width = ?,
        length_pur = ?,
        length_rem = ?,
        date_pur = ?,
        cost = ?,
        project = ?
        WHERE id = ?`,
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
        ]
      );
      console.log('id', item.id);
    });
  };

  const onDateSelected = (event, value) => {
    if (Platform.OS === 'android') {
      setDatePicker(false);
    }
    setDate(value);
    setEditFabricObj({ ...editFabricObj, date_pur: value.toJSON() });
  };

  const showDatePicker = () => {
    setDatePicker(true);
  };

  const handleOnChange = (key, value) => {
    console.log('key: ' + key + ' value: ' + value);

    setEditFabricObj((editFabricObj) => ({
      ...editFabricObj,
      [key]: value,
    }));
  };
  console.log(editFabricObj.image_uri);

  //shared props for numeric input
  const numericInputProps = {
    minValue: 0,
    totalWidth: screenWidth / 3,
    totalHeight: screenHeight / 15,
    step: 0.5,
    valueType: 'real',
    textColor: '#00637f',
    iconStyle: { color: 'white' },
    rightButtonBackgroundColor: '#e4c2ca',
    leftButtonBackgroundColor: '#e4c2ca',
  };

  //shared props for text input
  const textInputProps = {
    style:addEditStyles.inputBar,
    placeholderTextColor:'#00637f',
    color:'#00637f',
    fontSize:textStyles.text.fontSize
  };

  return (
    <SafeAreaView style={addEditStyles.container}>
      <ScrollView style={addEditStyles.scrollContainer}>
        <View style={addEditStyles.imageContainer}>
          <Image
            style={addEditStyles.imageThumb}
            source={{
              uri: editFabricObj.image_uri,
            }}
          />
          <TouchableOpacity
            style={addEditStyles.takePictureButton}
            onPress={() => {
              navigation.navigate('Camera', { data: editFabricObj });
            }}
          >
            <Feather name='camera' size={textStyles.largeIcon.fontSize} color='#00637f' />
          </TouchableOpacity>
        </View>

        <View style={addEditStyles.row}>
          <Text style={[addEditStyles.label, textStyles.text]}> Name: </Text>
          <TextInput
            {...textInputProps}
            placeholder='Enter fabric name'
            onChangeText={(value) =>
              setEditFabricObj({ ...editFabricObj, name: value })
            }
            value={editFabricObj.name}
          />
        </View>

        <View style={addEditStyles.row}>
          <Text style={[addEditStyles.label, textStyles.text]}> Colour: </Text>
          <TextInput
            {...textInputProps}
            placeholder='Enter fabric colour'
            onChangeText={(value) =>
              setEditFabricObj({ ...editFabricObj, colour: value })
            }
            value={editFabricObj.colour}
          />
        </View>

        <SwitchSelector
          style={addEditStyles.switch}
          textColor={'#00637f'}
          selectedColor={'#fff'}
          buttonColor={'#e4c2ca'}
          borderColor={'#e4c2ca'}
          fontSize={textStyles.text.fontSize}
          hasPadding
          bold={true}
          options={switchOptions}
          initial={editFabricObj.woven_knit}
          value={editFabricObj.woven_knit}
          onPress={(value) =>
            setEditFabricObj({ ...editFabricObj, woven_knit: value })
          }
        ></SwitchSelector>

        <View style={addEditStyles.row}>
          <Text style={[addEditStyles.label, textStyles.text]}>
            Fabric type:
          </Text>
          <Picker
            selectedValue={editFabricObj.type}
            style={addEditStyles.picker}
            onValueChange={(value, itemIndex) =>
              setEditFabricObj({ ...editFabricObj, type: value })
            }
          >
            <Picker.Item label='Cotton' value='Cotton' />
            <Picker.Item label='Wool' value='Wool' />
            <Picker.Item label='Linen' value='Linen' />
            <Picker.Item label='Jersey' value='Jersey' />
            <Picker.Item label='Synthetic' value='Synthetic' />
            <Picker.Item label='Swim Suiting' value='Swim Suiting' />
            <Picker.Item label='Lycra' value='Lycra' />
            <Picker.Item label='Denim' value='Denim' />
          </Picker>
        </View>

        <View style={addEditStyles.row}>
          <Text style={[addEditStyles.label, textStyles.text]}>
            Fabric Width (in m):
          </Text>
          <NumericInput
            {...numericInputProps}
            value={editFabricObj.width}
            onChange={(value) =>
              setEditFabricObj({ ...editFabricObj, width: value })
            }
            rounded
          />
        </View>

        <View style={addEditStyles.row}>
          <Text style={[addEditStyles.label, textStyles.text]}>
            Length Purchased (in m):
          </Text>
          <NumericInput
            {...numericInputProps}
            value={editFabricObj.length_pur}
            onChange={(value) =>
              setEditFabricObj({ ...editFabricObj, length_pur: value })
            }
            rounded
          />
        </View>

        <View style={addEditStyles.row}>
          <Text style={[addEditStyles.label, textStyles.text]}>
            Length Remaining (in m):
          </Text>
          <NumericInput
            {...numericInputProps}
            value={editFabricObj.length_rem}
            onChange={(value) =>
              setEditFabricObj({ ...editFabricObj, length_rem: value })
            }
            maxValue={editFabricObj.length_pur}
            rounded
          />
        </View>

        <View style={addEditStyles.row}>
          <Text style={[addEditStyles.label, textStyles.text]}>
            Date Purchased:{"\n"}
            {date.toDateString()}
          </Text>
          {!datePicker && (
            <TouchableOpacity
              style={addEditStyles.datePicker}
              onPress={showDatePicker}
            >
              <Feather name='calendar' size={textStyles.largeIcon.fontSize} color='#00637f' />
            </TouchableOpacity>
          )}
          {datePicker && (
            <DateTimePicker
              value={date}
              onChange={onDateSelected}
              style={{ flex: 1, backgroundColor: 'white' }}
            />
          )}
        </View>

        <View style={addEditStyles.row}>
          <Text style={[addEditStyles.label, textStyles.text]}>
            Cost (in £):
          </Text>
          <NumericInput
            {...numericInputProps}
            value={editFabricObj.cost}
            onChange={(value) =>
              setEditFabricObj({ ...editFabricObj, cost: value })
            }
            rounded
          />
        </View>

        <View style={addEditStyles.row}>
          <Text style={[addEditStyles.label, textStyles.text]}>
            Planned projects:
          </Text>
          <TextInput
            {...textInputProps}
            placeholder='Enter project ideas'
            onChangeText={(value) =>
              setEditFabricObj({ ...editFabricObj, project: value })
            }
            value={editFabricObj.project}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={addEditStyles.submitButton}
        onPress={() => {
          textValidation(editFabricObj);
        }}
      >
        <Text style={addEditStyles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
