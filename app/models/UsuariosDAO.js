const crypto = require('crypto')

function UsuariosDAO(connection){
    this._connection = connection()
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
    this._connection.open((err, mongoclient) => {
        mongoclient.collection("usuarios",(err, collection) => {
            const senha_criptografada =crypto.createHash("md5").update(usuario.senha).digest("hex") //PASSA STRING PARA MD5
            usuario.senha = senha_criptografada
            collection.insert(usuario)
            mongoclient.close()
        })     
    })
}

UsuariosDAO.prototype.autenticar = function(usuario, req, res){
    this._connection.open((err, mongoclient) => {
        mongoclient.collection("usuarios",(err, collection) => {
            const senha_criptografada =crypto.createHash("md5").update(usuario.senha).digest("hex") //PASSA STRING PARA MD5
            usuario.senha = senha_criptografada
            collection.find(usuario).toArray((err, result) => { //VERIFICA NO MONGODB SE EXISTE
            req.session.autorizado = (result[0] != undefined) ? true : false
            req.session.usuario    = (result[0] != undefined) ? result[0].usuario : false
            req.session.casa       = (result[0] != undefined) ? result[0].casa    : false  
                if(req.session.autorizado){
                    res.redirect("jogo")
                }else{

                    res.render('index',{validacao:{
                                            param: 'invalido',
                                            msg: 'Usuário ou Senha Inválidos',
                                            value: ''
                                        }, 
                                        dadosForm: req.body})
                }    
            }) 

            
            mongoclient.close()
        })     
    }) 
}

module.exports = () => UsuariosDAO