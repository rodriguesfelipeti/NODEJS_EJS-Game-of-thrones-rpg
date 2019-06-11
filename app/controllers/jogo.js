module.exports.jogo = (application,req,res) =>{
    if(!req.session.autorizado){
        res.render('index',{validacao: {}, dadosForm: {}})
        return
    }
    
    const comando_invalido = (req.query.comando_invalido == 'S') ? 'S' : 'N'
    const usuario = req.session.usuario
    const casa    = req.session.casa
    console.log(comando_invalido)
    const connection = application.config.dbConnection
    const JogoDAO = new application.app.models.JogoDAO(connection)
    JogoDAO.iniciaJogo(res, usuario, casa, comando_invalido)
} 

module.exports.suditos = (application, req, res) => {
    if(!req.session.autorizado){
        res.render('index',{validacao: {}, dadosForm: {}})
        return
    }
    res.render('aldeoes', {validacao: {}})
}

module.exports.pergaminhos = (application, req, res) => {
    if(!req.session.autorizado){
        res.render('index',{validacao: {}, dadosForm: {}})
        return
    }
    res.render('pergaminhos', {validacao: {}})
}

module.exports.ordernar_acao_sudito = (application, req, res) =>{
    var dadosForm = req.body
    req.assert('acao','Ação pode ser vazio').notEmpty()
    req.assert('quantidade','Quantidade pode ser vazio').notEmpty()

    const erros = req.validationErrors()
    if(erros){
        res.redirect('jogo?comando_invalido=S')
        return
    }

    console.log(dadosForm)
    res.send('tudo ok')
}

module.exports.sair = (application,req,res) => {
    req.session.destroy( (err) => res.render('index',{validacao: {}, dadosForm: {}}))
}