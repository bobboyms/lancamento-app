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
  Picker,
  Platform
} from "react-native";
import { LinearGradient } from "expo";
import { TextInputMask } from "react-native-masked-text";
import DateTimePicker from "react-native-modal-datetime-picker";
import ListaDeSelecao from "../componentes/ListaSelecao";
import obterArryComIcone from "../funcoes/icones";
import sessaoUsuario, { URL_BASE } from "./sessao/SessaoUsuario";

//import console = require("console");

export default class Lancamento extends React.Component {
  state = {
    dadosContasApagar: [
      {
        nome: "Alimentaçao",
        icone: require("../assets/iconFood.png")
      },
      {
        nome: "Educaçao",
        icone: require("../assets/iconAluno.png")
      },
      {
        nome: "Lazer",
        icone: require("../assets/iconFun.png")
      },
      {
        nome: "Moradia",
        icone: require("../assets/iconHouse.png")
      },
      {
        nome: "Pagamentos",
        icone: require("../assets/iconPagamento.png")
      },
      {
        nome: "Roupa",
        icone: require("../assets/iconRoupa.png")
      },
      {
        nome: "Saude",
        icone: require("../assets/iconMedicina.png")
      },
      {
        nome: "Transporte",
        icone: require("../assets/iconCarro.png")
      }
    ],

    dadosReceita: [
      {
        nome: "Salario",
        icone: require("../assets/iconEscola.png")
      },
      {
        nome: "Venda de serviço",
        icone: require("../assets/iconFood.png")
      },
      {
        nome: "Venda de ativo",
        icone: require("../assets/iconCarro.png")
      }
    ],

    dadosDaConta: [],

    valor: "0,0",
    valorFloat: 0,

    ativoModalDespesa: false,
    despesa: {
      nome: "",
      icone: require("../assets/iconCarrinho.png")
    },

    ativoModalConta: false,
    conta: {
      nome: "Selecione uma conta",
      icone: require("../assets/iconCofre.png")
    },

    isDateTimePickerVisible: false,
    dataDaDespesa: { valor: "Selecione a data", objeto: {} },
    estadoCadastrando: true,
    descricao: ""
  };

  validarDados = () => {
    if (this.state.valorFloat <= 0) {
      alert("Digite o valor");
      return false;
    }

    if (this.state.despesa.nome === "Selecione uma despesa") {
      alert("Selecione uma despesa");
      return false;
    }

    if (this.state.conta.nome === "Selecione uma conta") {
      alert("Selecione uma conta");
      return false;
    }

    if (this.state.dataDaDespesa.valor === "Selecione a data") {
      alert("Selecione a data do lançamento");
      return false;
    }

    return true;
  };

  resetarValores = () => {
    this.setState({
      valor: "0,0",
      valorFloat: 0,

      ativoModalDespesa: false,
      despesa: {
        nome: "Selecione uma despesa",
        icone: require("../assets/iconCarrinho.png")
      },

      ativoModalConta: false,
      conta: {
        nome: "Selecione uma conta",
        icone: require("../assets/iconCofre.png")
      },

      isDateTimePickerVisible: false,

      dataDaDespesa: { valor: "Selecione a data", objeto: {} }
    });
  };

  componentDidMount() {}

  fecharModalDespesa = () => {
    this.setState({ ativoModalDespesa: false });
  };

  fecharModalConta = () => {
    this.setState({ ativoModalConta: false });
  };

  selecionarItemDespesa = item => {
    const ativoModalDespesa = false;
    const despesa = item;

    this.setState({ ativoModalDespesa, despesa });
  };

  selecionarItemConta = item => {
    const ativoModalConta = false;
    const conta = item;

    this.setState({ ativoModalConta, conta });
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  getFormattedDate = date => {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date
      .getDate()
      .toString()
      .padStart(2, "0");

    return month + "/" + day + "/" + year;
  };

  _handleDatePicked = date => {
    const dataDaDespesa = { valor: this.getFormattedDate(date), objeto: date };
    this.setState({ dataDaDespesa });
    this._hideDateTimePicker();
  };

  render() {
    const {
      aberto,
      fecharModal,
      receberLancamento,
      tipoLancamento,
      estadoCadastrando
    } = this.props;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={aberto}
        onRequestClose={() => {
          alert("Modal has been closed.");
        }}
        onShow={() => {

          const busca = {
            _grupo: sessaoUsuario.usuario._grupo
          }

          axios
            .post(`${URL_BASE}/main/obter_contas`, busca)
            .then(res => {

              const dados = res.data;
              //console.log("Dados da conta: ", dados)
              const dadosDaConta = obterArryComIcone(dados);
              this.setState({ dadosDaConta });
            })
            .catch(erro => {
              console.log("Deu um erro", erro);
            });

          if (estadoCadastrando) {
            const despesa = {
              icone:
                tipoLancamento === "DESPESA"
                  ? require("../assets/iconCarrinho.png")
                  : require("../assets/iconMoney2.png"),
              nome:
                tipoLancamento === "DESPESA"
                  ? "Selecione uma despesa"
                  : "Selecione uma receita"
            };

            const descricao = "";
            this.setState({ despesa, descricao });
          } else {
            const { lancamento } = this.props;

            const _id = lancamento._id;
            const tipoLancamento = lancamento.tipoLancamento;
            const descricao = lancamento.descricao;
            const valor = lancamento.valor;
            const valorFloat = lancamento.valorFloat;
            const despesa = lancamento.despesa;
            const conta = lancamento.conta;
            const dataDaDespesa = lancamento.dataDaDespesa;
            const usuario = lancamento.usuario;

            this.setState({
              _id,
              tipoLancamento,
              descricao,
              valor,
              valorFloat,
              despesa,
              conta,
              dataDaDespesa,
              usuario
            });
          }
        }}
      >
        <View
          style={{
            paddingTop: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5
            },
            shadowOpacity: 0.36,
            shadowRadius: 6.68,
            elevation: 11
          }}
        />
        <View style={[styles.container, { backgroundColor: "#dee4ed" }]}>
          <Text style={{ marginTop: 20, fontWeight: "bold" }}>
            LANÇAR {this.props.tipoLancamento}
          </Text>
          <View style={styles.SectionStyle}>
            <Image
              source={require("../assets/moneyIcon.png")}
              style={styles.ImageStyle}
            />
            <TextInputMask
              type={"money"}
              options={{
                precision: 2,
                separator: ",",
                delimiter: ".",
                unit: "R$",
                suffixUnit: ""
              }}
              value={this.state.valor}
              onChangeText={text => {
                const valor = text;
                const valorFloat = parseFloat(
                  text
                    .replace("R$", "")
                    .replace(".", "")
                    .replace(",", ".")
                );
                this.setState({ valor, valorFloat });
              }}
              style={{
                height: 50,
                borderRadius: 10,
                width: "90%"
              }}
            />
          </View>

          <View style={styles.SectionStyle}>
            <Image
              source={this.state.despesa.icone}
              style={styles.ImageStyle}
            />
            <TouchableOpacity
              style={{
                height: 50,
                borderRadius: 10,
                marginTop: 33,
                width: "90%"
              }}
              onPress={() => {
                this.setState({ ativoModalDespesa: true });
              }}
            >
              <View>
                <Text>{this.state.despesa.nome}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.SectionStyle}>
            <Image source={this.state.conta.icone} style={styles.ImageStyle} />
            <TouchableOpacity
              style={{
                height: 50,
                borderRadius: 10,
                marginTop: 33,
                width: "90%"
              }}
              onPress={() => {
                this.setState({ ativoModalConta: true });
              }}
            >
              <View>
                <Text>{this.state.conta.nome}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.SectionStyle}>
            <Image
              source={require("../assets/iconCalendario.png")}
              style={styles.ImageStyle}
            />
            <TouchableOpacity
              style={{
                height: 50,
                borderRadius: 10,
                marginTop: 33,
                width: "90%"
              }}
              onPress={() => {
                this.setState({ isDateTimePickerVisible: true });
              }}
            >
              <View>
                <Text>{this.state.dataDaDespesa.valor}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.SectionStyle}>
            <Image
              source={require("../assets/iconNota.png")}
              style={styles.ImageStyle}
            />

            <TextInput
              style={{
                height: 40,
                borderRadius: 10,
                width: "90%"
              }}
              placeholder="Descreva a despesa"
              underlineColorAndroid="transparent"
              value={this.state.descricao}
              onChangeText={text => this.setState({ descricao: text })}
            />
          </View>

          {/** **/}

          <TouchableHighlight
            onPress={() => {
              const lancamento = {
                _id: estadoCadastrando ? null : this.state._id,
                tipoLancamento: this.props.tipoLancamento,
                descricao: this.state.descricao,
                valor: this.state.valor,
                valorFloat: this.state.valorFloat,
                despesa: this.state.despesa,
                conta: this.state.conta,
                dataDaDespesa: this.state.dataDaDespesa,
                usuario: estadoCadastrando ? null : this.state.usuario
              };

              if (this.validarDados()) {
                receberLancamento(lancamento);
                this.resetarValores();
                fecharModal();
              }
            }}
            style={{
              height: 50,
              width: "93%"
            }}
          >
            <LinearGradient
              colors={
                this.props.tipoLancamento === "DESPESA"
                  ? ["#ad1641", "#f44242"]
                  : ["#3cbc9e", "#135138"]
              }
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                borderRadius: 5
              }}
            >
              <Text>
                {estadoCadastrando === true
                  ? "Fazer Lançamento"
                  : "Editar Lançamento"}
              </Text>
            </LinearGradient>
          </TouchableHighlight>

          {estadoCadastrando === false ? (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Excluir",
                  "Excluir lançamento",
                  [
                    {
                      text: "Sim",
                      onPress: () => {
                        const { onDelete, lancamento } = this.props;

                        dados = {
                          _id: lancamento._id
                        };

                        console.log("Deletou: ", dados);

                        axios
                          .post(`${URL_BASE}/main/lancamento/deletar`, dados)
                          .then(res => {
                            const data = res.data;
                            if (data.sucesso) {
                              this.resetarValores();
                              onDelete();
                              fecharModal();
                            }
                          })
                          .catch(erro => {
                            alert("Deu um erro", erro);
                          });
                      }
                    },
                    {
                      text: "Não",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    }
                  ],
                  { cancelable: false }
                );
              }}
              style={{
                height: 50,
                width: "93%"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  borderRadius: 5,
                  color: "red"
                }}
              >
                <Text style={{ color: "red" }}>Exluir lancamento</Text>
              </View>
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            onPress={() => {
              this.resetarValores();
              fecharModal();
            }}
            style={{
              height: 50,
              width: "93%"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                borderRadius: 5
              }}
            >
              <Text>Cancelar</Text>
            </View>
          </TouchableOpacity>
        </View>

        {this.props.tipoLancamento === "DESPESA" ? (
          <ListaDeSelecao
            ativo={this.state.ativoModalDespesa}
            fecharModal={this.fecharModalDespesa}
            selecionarItem={this.selecionarItemDespesa}
            dados={this.state.dadosContasApagar}
          />
        ) : (
          <ListaDeSelecao
            ativo={this.state.ativoModalDespesa}
            fecharModal={this.fecharModalDespesa}
            selecionarItem={this.selecionarItemDespesa}
            dados={this.state.dadosReceita}
          />
        )}

        <ListaDeSelecao
          ativo={this.state.ativoModalConta}
          fecharModal={this.fecharModalConta}
          selecionarItem={this.selecionarItemConta}
          dados={this.state.dadosDaConta}
        />

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  sombra: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  boxComSombra: {
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 10,
    height: 100,
    padding: 15,
    backgroundColor: "#ffffff"
  },

  boxReceitaDespesa: {
    flex: 1,
    flexDirection: "row",
    marginTop: 12
  },

  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    height: 40,
    borderRadius: 5,
    margin: 10
  },

  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center"
  },

  container: {
    flex: 1,
    alignItems: "center",
    margin: 10
  }
});
