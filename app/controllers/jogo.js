module.exports.jogo = (application,req,res) =>{
    if(!req.session.autorizado){
        res.render('index',{validacao: {}, dadosForm: {}})
        return
    }
    
    var msg = ''
    if(req.query.msg != ''){
        msg = req.query.msg
    }
    const usuario = req.session.usuario
    const casa    = req.session.casa
    const connection = application.config.dbConnection
    const JogoDAO = new application.app.models.JogoDAO(connection)
    JogoDAO.iniciaJogo(res, usuario, casa, msg)
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

    const connection = application.config.dbConnection
    const JogoDAO = new application.app.models.JogoDAO(connection)

    JogoDAO.getAcoes(res,req,req.session.usuario)
}

module.exports.ordernar_acao_sudito = (application, req, res) =>{
    var dadosForm = req.body
    req.assert('acao','Ação pode ser vazio').notEmpty()
    req.assert('quantidade','Quantidade pode ser vazio').notEmpty()

    const erros = req.validationErrors()
    if(erros){
        res.redirect('jogo?msg=A')
        return
    }

    const connection = application.config.dbConnection
    const JogoDAO = new application.app.models.JogoDAO(connection)
    dadosForm.usuario = req.session.usuario //inclui chaves no json
    
    JogoDAO.acao(dadosForm)
    res.redirect('jogo?msg=B')
}

module.exports.revogar_acao = (application,req,res) => {
    const url_query = req.query
    const connection = application.config.dbConnection
    const JogoDAO = new application.app.models.JogoDAO(connection)

    JogoDAO.revogarAcao(res,url_query.id_acao)
}

module.exports.sair = (application,req,res) => {
    req.session.destroy( (err) => res.render('index',{validacao: {}, dadosForm: {}}))
}