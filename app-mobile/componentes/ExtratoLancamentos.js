import React from "react";
import axios from "axios";

import {
  StyleSheet,
  TextInput,
  Alert,
  Text,
  View,
  ScrollView,
  Button,
  Modal,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Picker
} from "react-native";

import Lancamento from "./Lancamento";
import { URL_BASE } from "./sessao/SessaoUsuario";



export default class ExtratoLancamento extends React.Component {
  state = {
    modalDespesaAberto: false,
  };

  fecharModalDespesa = () => {
    this.setState({ modalDespesaAberto: false });
  };

  onDelete = () => {
    const { buscarLancamentos } = this.props;
    buscarLancamentos();
  };

  //Edita o lançamento
  editarLancamento = (lancamento) => {
    
    const { buscarLancamentos, usuario } = this.props;

    console.log("Usuario: ", usuario)

    lancamento.usuario = usuario;

    const dados = {
      filtro : {_id:lancamento._id},
      novo_valor: lancamento
    }

    axios
      .post(`${URL_BASE}/main/lancamento/atualizar`, dados)
      .then(res => {
        const resposta = res.data;

        if (resposta.sucesso) {
          buscarLancamentos();
        } else {
          alert("Erro a fazer o lançamento");
        }
      })
      .catch(erro => {
        console.log("Deu um erro", erro);
      });
  }

  render() {

    const { lancamentos, receberLancamento } = this.props;

    console.log("Receber", typeof(receberLancamento))

    return (
      <ScrollView style={{ paddingRight: 30 }}>
        {lancamentos.map((valor, k) => {
          return (
            <TouchableOpacity
              style={{
                width: "100%",
                flexDirection: "row",
                marginLeft: 12,
                marginRight: 12,
                borderBottomColor: "#b5b8bc",
                borderBottomWidth: 1
              }}
              key={k}
              onPress={() => {
                const modalDespesaAberto = true;
                const lancamento = valor;
                const cadastrando = false;

                console.log("lancamento: ", lancamento);

                const tipoLancamento = valor.tipoLancamento;
                this.setState({
                  modalDespesaAberto,
                  tipoLancamento,
                  lancamento,
                  cadastrando
                });
              }}
            >
              <Image source={valor.despesa.icone} style={styles.ImageStyle} />

              <View
                style={{
                  width: "100%"
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: 30,
                    flexDirection: "row",
                    paddingVertical: 8
                  }}
                >
                  <View style={{ width: 200 }}>
                    <Text>{valor.despesa.nome}</Text>
                  </View>
                  <View
                    style={{
                      width: 113,
                      alignItems: "flex-end"
                    }}
                  >
                    <Text
                      style={
                        valor.tipoLancamento === "DESPESA"
                          ? { color: "red" }
                          : { color: "blue" }
                      }
                    >
                      {valor.valor}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: "100%",
                    height: 40
                  }}
                >
                  <Text>
                    {valor.conta.nome} | {valor.usuario.nome}
                  </Text>
                  <Text>
                    {valor.dataDaDespesa.valor} - {valor.descricao}
                  </Text>
                </View>

                
              </View>

              
            </TouchableOpacity>
          );
        })}

        <Lancamento
          aberto={this.state.modalDespesaAberto}
          fecharModal={this.fecharModalDespesa}
          receberLancamento={this.editarLancamento}
          tipoLancamento={this.state.tipoLancamento}
          lancamento={this.state.lancamento}
          estadoCadastrando={this.state.cadastrando}
          onDelete={this.onDelete}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center"
  }
});
