function UsuariosDAO(connection){
    this._connection = connection()
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
    this._connection.open((err, mongoclient) => {
        mongoclient.collection("usuarios",(err, collection) => {
            collection.insert(usuario)
            mongoclient.close()
        })     
    })
}

UsuariosDAO.prototype.autenticar = function(usuario, req, res){
    this._connection.open((err, mongoclient) => {
        mongoclient.collection("usuarios",(err, collection) => {
            collection.find(usuario).toArray((err, result) => { //VERIFICA NO MONGODB SE EXISTE
            req.session.autorizado = (result[0] != undefined) ? true : false
            req.session.usuario    = (result[0] != undefined) ? result[0].usuario : false
            req.session.casa       = (result[0] != undefined) ? result[0].casa    : false  
                if(req.session.autorizado){
                    res.redirect("jogo")
                }else{
                    res.render('index',{validacao: {}, dadosForm: {}})
                }    
            }) 

            
            mongoclient.close()
        })     
    }) 
}

module.exports = () => UsuariosDAO