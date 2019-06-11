/** importar mongoDB */
const mongo = require('mongodb')

// NÃO ABRE A CONEXÃO EM TODAS REQUESTS (RETORN CONST COM CONEXÃO)
const connMongoDB = () => {

    var db = new mongo.Db(
        'got', //game of thrones
        new mongo.Server(
            'localhost', //string do endereço do server
            27017, //porta padrão mongoDB
            {}
        ),
        {}
    )
    return db
}

module.exports = () => {
    return connMongoDB
}