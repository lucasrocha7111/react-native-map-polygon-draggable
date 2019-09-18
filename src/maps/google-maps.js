import React from 'react'
import { StyleSheet, View, Dimensions, Platform, TouchableOpacity, Text } from 'react-native';

import MapView, {
    UrlTile
} from 'react-native-maps';
import MapEditablePolygon from '../custom_modules/map-draw/MapEditablePolygon'
import { MapModal } from '../custom_modules/map-draw/MapModal'

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

export class GoogleMapsApp extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          region: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          mapSelected: 'google',
          onlineTile: null,
          showOnlineTile: false
        }
    
        this.modal = null
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
            <View style={[{flex: 1}]}>
                <MapModal 
                    ref={(c) => this.modal = c}
                />
                <MapView
                    provider={'google'}
                    style={styles.map}
                    mapType={Platform.OS == "android" ? "none" : "standard"}
                    initialRegion={region}
                    onMapReady={() => {

                    }}
                >  
                    {this.state.onlineTile !== null && this.state.showOnlineTile
                    ? <UrlTile
                        /**
                         * The url template of the tile server. The patterns {x} {y} {z} will be replaced at runtime
                         * For example: 
                         * http://c.tile.openstreetmap.org/{z}/{x}/{y}.png
                         * https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}
                         */
                        urlTemplate={this.state.onlineTile}
                        maximumZ={19}
                        flipY={false}
                    />
                    : null
                    }
                    <MapEditablePolygon 
                        coordinates={pooly}
                        fillColor="rgba(0, 200, 0, 0.5)"
                        strokeColor="rgba(0,0,0,0.5)"
                        strokeWidth={4}
                        tappable={true}
                        modal={this.modal}
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
                <View style={[{position: 'absolute', bottom: 30, flexDirection: 'row', flex: 1}]}>
                    <TouchableOpacity 
                        onPress={() => {
                            this.setState({
                                onlineTile: 'http://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
                                showOnlineTile: false
                            })
                            setTimeout(() => {
                                this.setState({
                                    showOnlineTile: true
                                })
                            }, 10)
                        }}
                        style={[{borderRadius: 10, backgroundColor: 'rgba(0, 0, 0, 0.7)', flex: 1, paddingHorizontal: 10, paddingVertical: 10}]}>
                        <Text style={[{padding: 4, color: '#fff', textAlign: 'center'}]}>OpenMaps</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {
                            this.setState({
                                onlineTile: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
                                showOnlineTile: false
                            })
                            setTimeout(() => {
                                this.setState({
                                    showOnlineTile: true
                                })
                            }, 10)
                        }}
                        style={[{borderRadius: 10, backgroundColor: 'rgba(0, 0, 0, 0.7)', flex: 1, paddingHorizontal: 10, paddingVertical: 10}]}>
                        <Text style={[{padding: 4, color: '#fff', textAlign: 'center'}]}>ArcGIS</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        )
    }
    
}
  
const styles = StyleSheet.create({
    map: {
        flex: 1,
        minWidth: width,
        minHeight: height
    }
});