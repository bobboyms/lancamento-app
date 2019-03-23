from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.json_util import dumps

conn = MongoClient('mongodb://admin:admin1234@ds039027.mlab.com:39027/gerenciador')
db = conn.gerenciador 

id_grupo = str(ObjectId())

db.grupo_usuario.insert({
    "_id":id_grupo
})

id_usuario = str(ObjectId())

usuario = {
	"_id" : id_usuario,
	"_grupo" : id_grupo,
	"nome" : "Rafael",
	"login" : "rafael",
	"senha" : "1234",
	"email" : "teste@teste.com.br"
}

db.usuario_sistema.insert(usuario)

contas = {
	"_id" : str(ObjectId()),
	"_grupo" : id_grupo,
	"nome" : "Caixa",
	"nomeIcone" : "iconMoney"
}

db.contas_grupo_usuario.insert(contas)

print("Feito com sucesso")

