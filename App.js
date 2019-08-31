import React from 'react';
import { StyleSheet, View, Text, Dimensions, Alert } from 'react-native';

import MapView, {
  ProviderPropType,
} from 'react-native-maps';
import MapEditablePolygon from './custom_modules/react-native-maps-draw/components/MapEditablePolygon'

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
      draw: [
        [{
          latitude: LATITUDE + SPACE,
          longitude: LONGITUDE + SPACE,
        },
        {
          latitude: LATITUDE - SPACE,
          longitude: LONGITUDE - SPACE,
        },
        {
          latitude: LATITUDE - SPACE,
          longitude: LONGITUDE + SPACE,
        }]
      ],
      editing: false
    }

    interval = null
  }

  render() {
    const { region } = this.state;
    let pooly = [{
      latitude: LATITUDE + SPACE,
      longitude: LONGITUDE + SPACE,
    },
    {
      latitude: LATITUDE - SPACE,
      longitude: LONGITUDE - SPACE,
    },
    {
      latitude: LATITUDE - SPACE,
      longitude: LONGITUDE + SPACE,
    }]

    let pooly2 = [{
      latitude: LATITUDE + SPACE + 0.7,
      longitude: LONGITUDE + SPACE + 0.11,
    },
    {
      latitude: LATITUDE - SPACE - 0.3,
      longitude: LONGITUDE - SPACE - 0.7,
    },
    {
      latitude: LATITUDE - SPACE - 0.7,
      longitude: LONGITUDE + SPACE + 0.7,
    }]

    let pooly3 = [{
      latitude: LATITUDE + SPACE + 0.24,
      longitude: LONGITUDE + SPACE + 0.44,
    },
    {
      latitude: LATITUDE - SPACE - 0.24,
      longitude: LONGITUDE - SPACE -0.34,
    },
    {
      latitude: LATITUDE - SPACE - 0.30,
      longitude: LONGITUDE + SPACE + 0.14,
    }]
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={region}
          scrollEnabled={!this.state.editing}
        >
          <MapEditablePolygon 
            coordinates={pooly}
            fillColor="rgba(0, 200, 0, 0.5)"
            strokeColor="rgba(0,0,0,0.5)"
            strokeWidth={4}
            tappable={true}
          />

          <MapEditablePolygon 
            coordinates={pooly2}
            fillColor="rgba(0, 200, 0, 0.5)"
            strokeColor="rgba(0, 200, 0, 0.5)"
            strokeWidth={4}
            tappable={true}
          />

          <MapEditablePolygon 
            coordinates={pooly3}
            fillColor="rgba(0, 200, 0, 0.5)"
            strokeColor="rgba(200,3,6,0.5)"
            strokeWidth={4}
            tappable={true}
          />

        </MapView>
      </View>
    );
  }

}


App.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});

export default App;
