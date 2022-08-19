import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export default function CameraScreen({ navigation, route }) {
  // Variables to handle camera & media library permissions
  const [hasPermission, setHasPermission] = useState(null);
  const [hasMediaPermission, setHasMediaPermission] = useState(null);
  // Variable to set front or back camera
  const [type, setType] = useState(Camera.Constants.Type.back);
  // variable to set photo and photo preview image
  const [preview, setPreview] = useState(false);
  const [photo, setPhoto] = useState(null);
  // Variable to set flash on/off
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  // variables to get previous screen
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2];


  const fabricData = route.params.data;
  console.log('fabric data from add item: ' , fabricData);

  let camera = useRef(null);

  useEffect(() => {
    // requests camera and media library permissions
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraPermission.status === "granted");

      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasMediaPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);


  // Function to display alert if permissions denied. takes a message as input
  const denyAlert = (msg) => {
    if (msg === "cameraDeny") {
      Alert.alert(
        "Alert",
        "Access denied to camera",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ],
        { cancelable: false }
      );
    } else if (msg === "mediaDeny") {
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
  };
  //function to take photo and set preview image
  const takePhoto = async () => {
    try {
      if (!camera) return;
      const photoData = await camera.current.takePictureAsync();
      setPreview(true);
      setPhoto(photoData);
    } catch (error) {
      console.log("Error: " + error);
    }
  };
  // function to clear photo variables to retake picture
  const retakePicture = () => {
    setPhoto(null);
    setPreview(false);
  };

  // Save photo to Camera Roll
  const savePhoto = async () => {
    try {
      const asset = await MediaLibrary.createAssetAsync(photo.uri);
      //sends image uri to previous page as param
      navigation.navigate({
        key: prevRoute.key,
        params: { photoUri: asset.uri, data: fabricData },
      });
    } catch (error) {
      console.log('Error: ' + error);
    }
  };


  // Camera preview component view
  const CameraPreview = ({ photo }: any) => {
    // console.log("sdsfds", photo);
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBackground}
          source={{ uri: photo && photo.uri }}
        />
        <View style={styles.previewContainer}>
          <TouchableOpacity onPress={retakePicture} style={styles.retakeButton}>
            <Text style={styles.retakeButtonText}>Re-take</Text>
          </TouchableOpacity>
          {hasMediaPermission ? (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => savePhoto()}
            >
              <Text style={styles.saveButtonText}>Save photo</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => denyAlert("mediaDeny")}
            >
              <Text style={styles.saveButtonText}>Save photo</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  // if camera permissions are granted display camera or preview imaghe
  if (hasPermission === null) {
    return <View />;
  } else if (hasPermission === false) {
    return <View {...denyAlert("cameraDeny")}></View>;
  } else {
    return (
      <SafeAreaView style={[styles.container]}>
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
              <Text style={{ fontSize: 20 }}>⚡️</Text>
            </TouchableOpacity>
          </Camera>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  previewContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageBackground: {
    flex: 5,
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
  saveButton: {
    width: 130,
    height: 40,
    alignItems: "center",
    borderRadius: 4,
  },
  saveButtonText: {
    color: "black",
    fontSize: 20,
  },
  retakeButton: {
    width: 130,
    height: 40,
    alignItems: "center",
    borderRadius: 4,
  },
  retakeButtonText: {
    color: "black",
    fontSize: 20,
  },
});
