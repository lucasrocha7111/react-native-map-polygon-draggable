import React from 'react'
import {
    Modal,
    Text, 
    TouchableOpacity, 
    View, 
    Alert,
    TextInput
} from 'react-native'

export class MapModal extends React.Component {

    state = {
      modalVisible: false,
      latitude: '',
      longitude: '',
      position: null
    }
  
    render() {
      return (
        <View style={{flex: 1}}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={[{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.9)', justifyContent: 'center'}]}>
                    <View style={[{marginTop: 10, padding: 20}]}>
                        {/* <Text style={[{textAlign: 'center', color: 'white', fontSize: 18, fontWeight: 'bold'}]}>Editar vertice</Text> */}

                        <View style={[{marginTop: 30}]}>
                            <Text style={[{color: 'white'}]}>Latitude</Text>
                            <TextInput 
                                style={[{width: '100%', borderBottomWidth: 1, borderBottomColor: 'red', color: 'white', height: 30}]}
                                onChangeText={(text) => {
                                    this.setState({
                                        latitude: text
                                    })
                                }}
                                value={this.state.latitude}
                            />
                        </View>
                        <View style={[{marginBottom: 30, marginTop: 10}]}>
                            <Text style={[{color: 'white'}]}>Longitude</Text>
                            <TextInput 
                                style={[{width: '100%', borderBottomWidth: 1, borderBottomColor: 'red', color: 'white', height: 30}]}
                                onChangeText={(text) => {
                                    this.setState({
                                        longitude: text
                                    })
                                }}
                                value={this.state.longitude}
                            />
                        </View>

                        <TouchableOpacity
                            style={[{width: '100%', backgroundColor: 'white', padding: 10, borderRadius: 10}]}
                            onPress={() => {
                                try {
                                    this.closeModal()
                                    if(typeof this.props.onConfirm !== 'undefined') {
                                        this.props.onConfirm()
                                    }
                                } catch(err) {

                                }
                            }}>
                            <Text style={[{color: 'black', textAlign: 'center'}]}>Salvar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[{width: '100%', padding: 10, marginTop: 10}]}
                            onPress={() => {
                                //this.setModalVisible(!this.state.modalVisible);
                                this.closeModal()
                            }}>
                            <Text style={[{color: 'white', textAlign: 'center'}]}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
        );
    }

    openModal = () => {
        this.setState({
            modalVisible: true
        })
    }

    closeModal = () => {
        this.setState({
            modalVisible: false
        })
    }

    setValue = (values) => {
        try {
            console.log('set value ', values)
            let { latitude, longitude, position } = values
            console.log(typeof latitude, latitude, typeof latitude.toString())
            this.setState({
                latitude: latitude,
                longitude: longitude,
                position: position
            })
        } catch(err) {
            console.log('catch ', err)
        }
        
    }

    getValues = () => {
        let values = {
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            position: this.state.position
        }
        return values
    }

}