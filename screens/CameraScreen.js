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
  ImageBackground,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import React, { useState, useRef, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Camera } from "expo-camera";
import * as MediaLibrary from 'expo-media-library';

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [hasMediaPermission, setHasMediaPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [preview, setPreview] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [savedPhoto, setSavedPhoto] = useState(null);

  let camera = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraPermission.status === "granted");

      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasMediaPermission(mediaLibraryPermission.status === "granted")
    })();
  }, []);
  console.log('media permisssion? '+ hasMediaPermission);
  console.log('camera permisssion? '+ hasPermission);

  const denyAlert = (msg) => {

  if (msg === 'cameraDeny') {
    Alert.alert(
      "Alert",
      "Access denied to camera",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("Add fabric"),
        },
      ],
      { cancelable: false }
    );
  }else if (msg === 'mediaDeny') {
    Alert.alert(
      "Alert",
      "Access denied to media",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("Camera"),
        },
      ],
      { cancelable: false }
    );
  }
}


  const takePhoto = async () => {
    try {
      if (!camera) return;
      const photoData = await camera.current.takePictureAsync();
      setPreview(true);
      setPhoto(photoData);
      console.log(setPhoto);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const retakePicture = () => {
    setPhoto(null);
    setPreview(false);
  };

  const savePhoto = async() => {
      const asset = await MediaLibrary.createAssetAsync(photo.uri);
      setSavedPhoto(asset);
      console.log('savePhoto called');
  };

  const CameraPreview = ({ photo }: any) => {
    console.log("sdsfds", photo);
    return (
      <View
        style={{
          backgroundColor: "transparent",
          flex: 1,
        }}
      >
        <ImageBackground
          source={{ uri: photo && photo.uri }}
          style={{ flex: 5 }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={retakePicture}
            style={{
              width: 130,
              height: 40,
              alignItems: "center",
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 20,
              }}
            >
              Re-take
            </Text>
          </TouchableOpacity>
            {hasMediaPermission ?
              <TouchableOpacity style={styles.saveButton} onPress={() => { savePhoto(), navigation.navigate("Add fabric", { photoUri: savedPhoto}); }}>
              <Text
                style={styles.saveButtonText}
              >
                Save photo
              </Text>
            </TouchableOpacity>
               : <TouchableOpacity style={styles.saveButton} onPress={() => denyAlert('mediaDeny')}>
               <Text
                 style={styles.saveButtonText}
               >
                 Save photo2
               </Text>
             </TouchableOpacity>}
        </View>
      </View>
    );
  };

  if (hasPermission === null) {
    return <View />;
  } else if (hasPermission === false) {
    return <View {...denyAlert('cameraDeny')}></View>;
  } else {
    return (
      <View style={[styles.container]}>
        {preview && photo ? (
          <CameraPreview
            photo={photo}
            savePhoto={savePhoto}
            retakePicture={retakePicture}
          />
        ) : (
          <Camera
            style={styles.camera}
            type={type}
            ref={camera}
            flashMode={flash}
          >
            <TouchableOpacity
              style={styles.flipButton}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text>Flip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.shutterButton}
              onPress={() => {
                takePhoto();
              }}
            />
            <TouchableOpacity
              style={[
                styles.flashButton,
                {
                  backgroundColor:
                    flash === Camera.Constants.FlashMode.off ? "#000" : "#fff",
                },
              ]}
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                );
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                ⚡️
              </Text>
            </TouchableOpacity>
          </Camera>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  camera: {
    flex: 1,
    alignItems: "center",
  },
  flipButton: {
    backgroundColor: "white",
    position: "absolute",
    bottom: "10%",
    right: "10%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  flashButton: {
    position: "absolute",
    left: "10%",
    bottom: "10%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    height: 40,
    width: 40,
  },
  shutterButton: {
    backgroundColor: "white",
    position: "absolute",
    bottom: "10%",
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  saveButton:{
    width: 130,
    height: 40,
    alignItems: "center",
    borderRadius: 4
  },
  saveButtonText:{
    color: "black",
    fontSize: 20,
  }
});
