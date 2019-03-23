import React from 'react';
import {
    StyleSheet,
    TextInput,
    Alert,
    Text,
    View,
    ScrollView,
    Modal,
    Image,
    TouchableHighlight,
} from 'react-native';
import { LinearGradient } from 'expo';

export default class ListaDeSelecao extends React.Component {

    render() {

        const { ativo, fecharModal, selecionarItem, dados } = this.props;

        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={ativo}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={{ paddingTop: 25, flex: 1, backgroundColor: "#aeb7c1", }}>
                    <View style={{
                        width: "100%", height: 70,
                        justifyContent: 'center',
                        backgroundColor: "#aeb7c1",
                        flexDirection: "row", alignItems: "center",
                    }}>
                        <Image
                            //We are showing the Image from online
                            source={require('../assets/iconFinder.png')}

                            //Image Style
                            style={{
                                padding: 10,
                                margin: 10,
                                height: 25,
                                width: 25,
                                resizeMode: 'stretch',
                                alignItems: 'center',
                            }}
                        />

                        <TextInput
                            style={{
                                flex: 1, marginRight: 20, height: 40, paddingLeft: 10,
                                backgroundColor: '#f4f9ff',
                                borderWidth: 0.5,
                                borderColor: '#aad2ff',
                                borderRadius: 5,
                            }}
                            placeholder="Buscar categoria"
                            underlineColorAndroid="transparent"
                        />


                    </View>

                    <ScrollView>

                        {dados.map((v, k) => {
                            return (
                                <TouchableHighlight key={k} onPress={() => {
                                    selecionarItem(v)
                                }} style={[styles.line]}>
                                    <LinearGradient colors={['#ffffff', '#eaedf9']} style={styles.lineGradiente}>
                                        <Image source={v.icone} style={styles.imageStyle}></Image>
                                        <Text>{v.nome}</Text>
                                    </LinearGradient>
                                </TouchableHighlight>
                            )
                        })}


                    </ScrollView>


                    <TouchableHighlight onPress={() => {
                        fecharModal();
                    }} style={{
                        borderBottomColor: "#c5c8cc",
                        borderBottomWidth: 1,
                        width: "100%", height: 50,
                    }}>
                        <LinearGradient colors={['#ad1641', '#f44242']} style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                        }}>
                            <Image source={require('../assets/iconStop.png')} style={styles.imageStyle}></Image>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                            }}>CANCELAR</Text>
                        </LinearGradient>
                    </TouchableHighlight>


                </View>
            </Modal>
        )
    }

}

const styles = StyleSheet.create({
    line: {
        borderBottomColor: "#c5c8cc",
        borderBottomWidth: 1,
        width: "100%", height: 50,
    },

    lineGradiente: {
        height: "100%", flexDirection: "row", alignItems: "center"
    },

    imageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center'
    },


});