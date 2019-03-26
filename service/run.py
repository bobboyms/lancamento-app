import os
from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

from flask import json, jsonify, request
from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.json_util import dumps

conn = MongoClient('mongodb://admin:admin1234@ds039027.mlab.com:39027/gerenciador')
db = conn.gerenciador 


@app.route("/")
def hello():
    return "Hello World!"

"""
"""
@app.route("/main/lancamento/autenticar", methods=["POST"])
def buscarUsuario():
    dados = request.get_json()
    resultado = db.usuario_sistema.find_one(dados)
    return dumps(resultado)

"""
Retorna as contas cadastradas para o usuario
"""
@app.route("/main/obter_contas", methods=["POST"])
def obterContas():
    dados = request.get_json()

    print("Bsucar conta", dados)

    resultado = db.contas_grupo_usuario.find(dados)
    return dumps(resultado)

@app.route("/main/lancamento/cadastrar", methods=["POST"])
def receberLancamento():
    dados = request.get_json()
    dados["_id"] = str(ObjectId())

    resultado = db.lancamentos.insert_one(dados)
    
    if resultado.acknowledged:
        return jsonify({"sucesso":True})
    else:
        return jsonify({"sucesso":False})
        
"""
"""
@app.route("/main/lancamento/deletar", methods=["POST"])
def deletarLancamento():

    dados = request.get_json()
    resultado = db.lancamentos.delete_many(dados)

    if resultado.acknowledged:
        return jsonify({"sucesso":True})
    else:
        return jsonify({"sucesso":False})

"""
"""
@app.route("/main/lancamento/buscar", methods=["POST"])
def buscarLancamentos():
    dados = request.get_json()
    grupo = dados["usuario"]["_grupo"]
    resultado = db.lancamentos.find({"usuario._grupo":grupo}).sort("_id", -1)
    return dumps(resultado)


"""
Atualiza um registro
"""
@app.route("/main/lancamento/atualizar", methods=['POST'])
def atualizarDados():

    try:
        dados = request.get_json()

        print(dados)

        resultado = db.lancamentos.replace_one(
            dados["filtro"], dados["novo_valor"])

        if resultado.acknowledged:
            return jsonify({"sucesso":True})
        else:
            return jsonify({"sucesso":False})

    except Exception as ex:
        return "Erro... %s" % ex


"""
"""
if __name__ == "__main__":
    #app.run(debug=True, host="0.0.0.0")
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)