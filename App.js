import React, { useState, useEffect } from "react";
import { 
  StyleSheet, 
  Text, 
  Image, 
  TouchableOpacity,
  Dimensions
} from "react-native";
import MapView from "react-native-maps";
import { Marker, Callout } from 'react-native-maps'; 
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import Lightbox from 'react-native-lightbox';
import Carousel from 'react-native-looped-carousel';

const WINDOW_WIDTH = Dimensions.get('window').width;

const getPermissionAsync = async () => {
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  }
};

const renderCarousel = () => (
  <Carousel style={{ width: WINDOW_WIDTH, height: WINDOW_WIDTH }}>
    <Image
      style={{ flex: 1 }}
      resizeMode="contain"
      source={{ uri: 'http://cdn.lolwot.com/wp-content/uploads/2015/07/20-pictures-of-animals-in-hats-to-brighten-up-your-day-1.jpg' }}
    />
    <View style={{ backgroundColor: '#6C7A89', flex: 1 }}/>
    <View style={{ backgroundColor: '#019875', flex: 1 }}/>
    <View style={{ backgroundColor: '#E67E22', flex: 1 }}/>
  </Carousel>
)

export default function App() {

  useEffect( async () => {
    await getPermissionAsync()
  }, []);

  const [locations, setLocations] = useState([]);
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        console.log(result.uri);
        setImages([...images, { uri: `${result.uri}`}]);
        console.log(images);
      }
    } catch (E) {
      console.log(E);
    }
  };
  
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
      onLongPress={ event => {
        console.log(event?.nativeEvent);
        if(event?.nativeEvent?.coordinate) {
          setLocations([...locations, event.nativeEvent.coordinate]);
        }
      }}
    >
      {
        locations.map((location, index) => {
          return (
            <Marker
              coordinate={location}
              key={index}
              pinColor="pink"
            >
              <Callout
              >
                {
                  images[index] ? (
                                    <Lightbox springConfig={{tension: 15, friction: 7}} swipeToDismiss={false} renderContent={renderCarousel}>
                                      <Image
                                        resizeMode="contain"
                                        source={images[index]}
                                      />
                                    </Lightbox>  
                                  ) : 
                                  <TouchableOpacity 
                                    onPress={ () => pickImage(index) }
                                    style={{backgroundColor: "red"}}
                                  >
                                    <Text>
                                      Choice Picture
                                    </Text>
                                  </TouchableOpacity> 
                }
                <Text>Marker {index}</Text>
              </Callout>
            </Marker>
          )
        })
      }
    </MapView>
  );
}

const styles = StyleSheet.create({
  callout: {
    // backgroundColor: "red",
  }
})