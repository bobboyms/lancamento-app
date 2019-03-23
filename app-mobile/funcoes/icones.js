export const baseDeIcones = [
    {
      nome: "iconMoney",
      icone: require("../assets/iconMoney.png"),
    },
];

const obterArryComIcone = (arr) => {

    const novoArr = arr.map(valor => {

        const icone = baseDeIcones.map(vl => {
            if (valor.nomeIcone === vl.nome) {
                valor.icone = vl.icone;
            }
        })

        return valor;

    })

    return novoArr;

}

export default obterArryComIcone;