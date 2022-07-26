import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import React, { useState, useRef, useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Camera } from 'expo-camera'


export default function CameraScreen({navigation}) {

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
  })()
  }, []);

  const denyAlert = () =>
    Alert.alert(
      "Alert",
      "Access denied",
        [{
          text: "OK",
          onPress: () => navigation.navigate('Add fabric')
        }
      ],
      { cancelable: false }
    );

  if (hasPermission === null){
    return (
      <View />
    );
  }else if (hasPermission === false){
    return (
      <View {...denyAlert()}>
      </View>
    );
  }else {
    return (
      <View style = {[styles.container]}>
  <Camera style= {styles.camera} type={type}>
  <TouchableOpacity
   style={styles.flipButton}
   onPress={()=>{
     setType(
       type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
     );
   }}
   >
    <Text>Flip</Text>
  </TouchableOpacity>
  </Camera>
</View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '5%',
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  camera:{
    flex:1,
    width:"100%",
    height:"100%",
    alignItems: "center"
  },
  flipButton:{
    backgroundColor:"white",
    position: "absolute",
    bottom: "20%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20
  }
});
