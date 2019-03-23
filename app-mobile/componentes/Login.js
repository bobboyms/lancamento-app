import React from "react";
import {
  StyleSheet,
  TextInput,
  Alert,
  Text,
  View,
  ScrollView,
  Modal,
  Button,
  Image,
  TouchableHighlight
} from "react-native";

import { LinearGradient } from "expo";
import sessaoUsuario from "./sessao/SessaoUsuario";



export default class Login extends React.Component {
  state = {
  
    usuario:{
        login:"",
        senha:""
    }

  };

  render() {
    
    const { autenticar } = this.props;

    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.usuario.login}
          onChangeText={username => {
            const { usuario } = this.state;
            usuario.login = username
            this.setState({ usuario })
          }}
          placeholder={"Usuario"}
          style={styles.input}
        />
        <TextInput
          value={this.state.usuario.senha}
          onChangeText={password => {
            const { usuario } = this.state;
            usuario.senha = password
            this.setState({ usuario })
          }}
          placeholder={"Senha"}
          secureTextEntry={true}
          style={styles.input}
        />

        <Button
          title={"Fazer login"}
          style={styles.input}
          onPress={() => {
              autenticar(this.state.usuario)
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    input: {
      width: 200,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      marginBottom: 10,
    },
  });