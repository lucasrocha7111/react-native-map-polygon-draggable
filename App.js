import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';

import { GoogleMapsApp } from './src/maps/google-maps'

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      mapSelected: 'google'
    }

    this.modal = null
  }

  render() {
    
    return (
      <View style={styles.container}>
        <GoogleMapsApp />
        <View style={[{position: 'absolute', bottom: 10}]}>
          <TouchableOpacity 
            onPress={() => {

            }}
            style={[{borderRadius: 10, backgroundColor: 'rgba(255, 255, 255, 0.6)', paddingHorizontal: 30, paddingVertical: 10}]}>
            <Text style={[{padding: 4}]}>Mudar de mapa</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.forceUpdate()
    }, 100)
  }

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});

export default App;
