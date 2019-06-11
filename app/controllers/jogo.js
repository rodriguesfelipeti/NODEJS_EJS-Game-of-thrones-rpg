module.exports.jogo = (application,req,res) =>{
    if(!req.session.autorizado){
        res.render('index',{validacao: {}, dadosForm: {}})
        return
    }
    
    const usuario = req.session.usuario
    const casa    = req.session.casa

    const connection = application.config.dbConnection
    const JogoDAO = new application.app.models.JogoDAO(connection)
    JogoDAO.iniciaJogo(res, usuario, casa)
} 

module.exports.sair = (application,req,res) => {
    req.session.destroy( (err) => res.render('index',{validacao: {}, dadosForm: {}}))
}