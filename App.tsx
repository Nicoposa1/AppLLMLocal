import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Camera, useCameraDevice, useCameraDevices, useCameraPermission } from "react-native-vision-camera";

export default function App() {
  const device = useCameraDevice('back')
  const { hasPermission } = useCameraPermission()

  if (!hasPermission) return null
  if (device == null) return null

  const camera = useRef<Camera>(null)



  return (
    <SafeAreaView style={styles.container}>

      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        ref={camera}
        photo={true}
      />
      <TouchableOpacity 
        // button to take a picture
        onPress={() => {
          
        }}
        style={{
          position: 'absolute',
          bottom: 20,
          width: 50,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          height: 50,
          borderRadius: 25, 
          left: '50%',
          marginLeft: -25,
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});