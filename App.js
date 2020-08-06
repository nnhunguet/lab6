import React from "react";
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from "react-native";
import MapView from "react-native-maps";
import { Marker, Callout } from 'react-native-maps'; 

const onLongPress = () => {
  console.log("OnLongPress");
};

const onPressPicture = () => {
  console.log(1);
};

export default class App extends React.Component {
  render() {
    return (
      <MapView
        style={{
          flex: 1
        }}  
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        onLongPress={onLongPress}
      >
        <Marker 
          coordinate={{latitude: 37.78825, longitude: -122.4324}} 
        >
          <Callout tooltip>
            <View style={styles.callout}>
              <Text>Test Call out</Text>
              <TouchableOpacity
                onPress={onPressPicture}
                style={{backgroundColor: "red"}}
              >
                <Text>Picture</Text>
              </TouchableOpacity>
            </View>
          </Callout>
        </Marker>
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  callout: {
    // backgroundColor: "red",
  }
})